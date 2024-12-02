<?php

namespace App\Service\Function\Execute;

use App\Models\User\BilModel;
use App\Http\Requests\BillRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Contract;
use App\Service\Function\Action\Firebase;
use Illuminate\Support\Facades\Auth;
use App\Service\Function\Action\Bill;
use App\Models\User\ContractModel;

class BillService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['code'];
    protected $columCode = 'code';
    public function __construct(BilModel $model, BillRequest $request)
    {
        $this->model = $model;
        $this->request = $request;
    }
    public function getList()
    {
        $page = $this->request->page ?? 1;
        $limit = $this->request->limit ?? 10;
        $excel = $this->request->excel ?? null;
        $search = $this->request->search ?? null;
        $typeTime = $this->request->typeTime ?? null;
        $start = $this->request->start ?? null;
        $end = $this->request->end ?? null;
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        
        $model = $this->model->with([
            'detail.service' => function ($query) {
                $query->select('id', 'name', 'price', 'unit');
            },
            'user' => function ($query) {
                $query->select('id', 'fullname');
            },
            'staff' => function ($query) {
                $query->select('id', 'fullname');
            },
            'room' => function ($query) {
                $query->select('id', 'name', 'buildingId', 'floorId');
            },
            'room.type_room' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'room.floor' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'room.building' => function ($query) {
                $query->select('id', 'name', 'code', 'address');
            },
        ]);
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64);
        return $result;
    }
    public function createAction()
    {
        $room = app(Bill::class)->getRoomInfo($this->request->roomId);
        $this->model->userId =  $room->userId;
        $this->model->staffId =  Auth::user()->id;
        $this->model->roomId =  $room->roomId;
        $this->model->contractId =  $room->id;
        $this->model->totalMoney =  $this->request->totalMoney;
        $this->model->status =  1;
        $this->model->ends_at = $this->getEndDateBill();
        $this->model->started_at =  $this->getStartDateBill();
        $this->model->code =  $this->generateUniqueCode(BilModel::class, $this->columCode);
        $this->model->note =  $this->request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();

        try {
            $addBill = $this->model->save();

            if ($addBill) {
                $addBillService = app(Bill::class)->BillService($this->request->servicesBill, $this->model->id);
                if ($addBillService) {
                    DB::commit();
                    return true;
                } else {
                    DB::rollback();
                    return false;
                }
            } else {
                DB::rollback();
                return false;
            }
        } catch (\Exception $e) {
            DB::rollback();
            return false;
        }
    }
    public function updateAction($id)
    {

        $data = $this->model->find($id);
        $data->ends_at = $this->getEndDateBill();
        $data->started_at =  $this->getStartDateBill();
        $data->totalMoney =  $this->request->totalMoney;
        $data->note =  $this->request->note;
        $data->updated_at = Carbon::now();
        DB::beginTransaction();

        try {
            $updateBill = $this->model->save();

            if ($updateBill) {
                $updateBillService = app(Bill::class)->updateBillService($this->request->servicesBill, $id);
                if ($updateBillService) {
                    DB::commit();
                    return true;
                } else {
                    DB::rollback();
                    return false;
                }
            } else {
                DB::rollback();
                return false;
            }
        } catch (\Exception $e) {
            DB::rollback();
            return false;
        }
    }
    public function deleteAction($id)
    {
        $data = $this->model->find($id);
        DB::beginTransaction();
        try {
            $deleteRoomService = app(Contract::class)->deleteContractServiceAll($id);
            $deleteRoomFurniture = app(Contract::class)->deleteContractFurnitureAll($id);
            $deleteContractCustomer = app(Contract::class)->deleteContractCustomersAll($id);
            $deleteContract = $data->delete();
            if ($deleteRoomService && $deleteRoomFurniture && $deleteContractCustomer && $deleteContract) {
                DB::commit();
                return true;
            }

            DB::rollBack();
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    public function getDataInRoomContract($roomId, $model, $relationship)
    {
        $getContract = ContractModel::where('roomId', $roomId)->orderBy('id', 'desc')->first();
        if (!$getContract) {
            return [];
        }
        return $model::with([
            $relationship => function ($query) {
                $query->select('id', 'name', 'code', 'price', 'unit');
            }
        ])->where('contractId', $getContract->id)->get() ?? [];
    }
}
