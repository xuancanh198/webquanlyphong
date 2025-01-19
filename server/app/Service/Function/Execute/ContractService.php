<?php

namespace App\Service\Function\Execute;

use App\Models\User\ContractModel;
use App\Http\Requests\ContractRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Contract;
use App\Service\Function\Action\Firebase;
use Illuminate\Support\Facades\Auth;
class ContractService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['code'];
    protected $columSelect = ['id', 'code', 'username'];
    public function __construct(ContractModel $model, ContractRequest $request)
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
        $isSelect = $this->request->isSelect ?? false;
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $filterBaseDecode = $this->request->filterBaseDecode ?? null;
        $model = $this->model->with([
            'customer.user' => function ($query) {
                $query->select('id', 'fullname');
            },
            'service.service' => function ($query) {
                $query->select('id', 'name', 'price', 'unit');
            },
            'furniture.furniture' => function ($query) {
                $query->select('id', 'name', 'price');
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
            'room.floor' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'room.building' => function ($query) {
                $query->select('id', 'name', 'code', 'address');
            },
        ]);

        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function createAction()
    {
        
        $this->model->priceTime =  $this->request->priceTime;
        $this->model->staffId =  Auth::user()->id;
        $this->model->deposit =  $this->request->deposit;
        $this->model->code =  $this->request->code;
        $this->model->startTime =  $this->request->startTime;
        $this->model->endTime =  $this->request->endTime;
        $this->model->roomId =  $this->request->roomId;
        $this->model->userId =  $this->request->userId;
        $this->model->note =  $this->request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();

        try {
            $addContract = $this->model->save();
            if ($addContract) {
                $addContractService = app(Contract::class)->ContractService($this->request->service, $this->model->id);
                $addContractFurniture = app(Contract::class)->ContractFurniture($this->request->furniture, $this->model->id);
                $addContractCustomers = app(Contract::class)->ContractCustomers($this->request->customers, $this->model->id);
                if ($addContractService && $addContractFurniture && $addContractCustomers) {
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
        $data->priceTime =  $this->request->priceTime;
        $data->deposit =  $this->request->deposit;
        $data->code =  $this->request->code;
        $data->startTime =  $this->request->startTime;
        $data->endTime =  $this->request->endTime;
        $data->roomId =  $this->request->roomId;
        $data->userId =  $this->request->userId;
        $data->note =  $this->request->note;
        if ($this->request->hasFile('images')) {
            $this->model->img =  app(Firebase::class)->uploadImage($this->request->file('image'));
        }
        $data->updated_at = Carbon::now();
        try {
            $updateContract = $data->save();
            if ($updateContract) {
                $updateContractService = app(Contract::class)->updateContractService($this->request->service, $id);
                $updateContractFurniture = app(Contract::class)->updateContractFurniture($this->request->furniture, $id);
                $updateContractCustomers = app(Contract::class)->updateContractCustomers($this->request->customers, $id);
                if ($updateContractService && $updateContractFurniture  && $updateContractCustomers) {
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
    
    public function getDataInRoom($roomId, $model, $relationship)
    {
        $modelInstance = new $model();
        return $modelInstance->with($relationship)->where('roomId', $roomId)->get();
    }
}
