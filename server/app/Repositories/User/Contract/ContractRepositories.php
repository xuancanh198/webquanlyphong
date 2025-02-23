<?php

namespace App\Repositories\User\Contract;

use App\Models\User\ContractModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use App\Service\Function\Action\ConvertData;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Contract;
use Illuminate\Support\Facades\Auth;
class ContractRepositories extends BaseRepositories implements ContractInterface
{
    protected $model;

    protected $columSearch = ['code'];
    protected $columSelect = ['id', 'code', 'username'];

    public function __construct(ContractModel $model)
    {
        $this->model = $model;
    }
    public function getList($request){
        $page = $request->page ?? 1;
        $limit = $request->limit ?? 10;
        $excel = $request->excel ?? null;
        $search = $request->search ?? null;
        $typeTime = $request->typeTime ?? null;
        $start = $request->start ?? null;
        $end = $request->end ?? null;
        $isSelect = $request->isSelect ?? false;
        $filtersBase64 = $request->filtersBase64 ?? null;
        $filterBaseDecode = $request->filterBaseDecode ?? null;
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
    public function create($request)
    {
        $this->model->priceTime =  $request->priceTime;
        $this->model->staffId =  Auth::user()->id;
        $this->model->deposit =  $request->deposit;
        $this->model->code =  $request->code;
        $this->model->startTime =  $request->startTime;
        $this->model->endTime =  $request->endTime;
        $this->model->roomId =  $request->roomId;
        $this->model->userId =  $request->userId;
        $this->model->note =  $request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();

        try {
            $addContract = $this->model->save();
            if ($addContract) {
                $addContractService = app(Contract::class)->ContractService($request->service, $this->model->id);
                $addContractFurniture = app(Contract::class)->ContractFurniture($request->furniture, $this->model->id);
                $addContractCustomers = app(Contract::class)->ContractCustomers($request->customers, $this->model->id);
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

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->identificationCard = $request->identificationCard;
        $data->fullname = $request->fullname;
        $data->username = $request->username;
        $data->defaultPassword = $request->passwordDefault;
        $data->phoneNumber = $request->phoneNumber;
        $data->email = $request->email;
        $data->address = $request->address;
        $data->note = $request->note;
        $data->dateOfBirth = app(ConvertData::class)->convertDateTimeFormat($request->dateOfBirth);
        $data->dateIssuanceCard = app(ConvertData::class)->convertDateTimeFormat($request->dateIssuanceCard);
        $data->placeIssue = $request->placeIssue;
        if ($request->hasFile('image')) {
            $data->imgLink = app(Firebase::class)->uploadImage($request->file('image'));
        }
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
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
}
