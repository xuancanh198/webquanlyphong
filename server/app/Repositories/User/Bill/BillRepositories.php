<?php

namespace App\Repositories\User\Bill;

use App\Models\User\BilModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use App\Service\Function\Action\ConvertData;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Contract;
use Illuminate\Support\Facades\Auth;
use App\Service\Function\Action\Bill;

class BillRepositories extends BaseRepositories implements BillInterface
{
    protected $model;

    protected $columSearch = ['code'];
    protected $columSelect = ['id', 'code', 'price'];
    protected $columCode = 'code';

    public function __construct(BilModel $model)
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
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function create($request)
    {
        $room = app(Bill::class)->getRoomInfo($request->roomId);
        $this->model->userId =  $room->userId;
        $this->model->staffId =  Auth::user()->id;
        $this->model->roomId =  $room->roomId;
        $this->model->contractId =  $room->id;
        $this->model->totalMoney =  $request->totalMoney;
        $this->model->status =  0;
        $this->model->ends_at = $this->getEndDateBill();
        $this->model->started_at =  $this->getStartDateBill();
        $this->model->code =  $this->generateUniqueCode(BilModel::class, $this->columCode);
        $this->model->note =  $request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();

        try {
            $addBill = $this->model->save();

            if ($addBill) {
                $addBillService = app(Bill::class)->BillService($request->servicesBill, $this->model->id);
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
            $deleteBillService = app(Bill::class)->deleteBillServiceAll($id);
            $deleteContract = $data->delete();
            if ($deleteBillService && $deleteContract) {
                DB::commit();
                return true;
            }

            DB::rollBack();
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
    public function getMyListUser($request){
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
        $query = $this->model->where('userId', Auth::id())->with([
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
        $result = $this->getListBaseFun($query, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function find($id){
        return $this->model->find($id);
    }
    public function updateStatus($id, $request){
        $data = $this->model->find($id);
        $data->status = $request->status;
        $data->updated_at = Carbon::now();
        return $data->save();
    }
}
