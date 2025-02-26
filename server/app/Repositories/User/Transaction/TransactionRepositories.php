<?php

namespace App\Repositories\User\Transaction;

use App\Models\User\TransactionModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use App\Service\Function\Action\ConvertData;
use Illuminate\Support\Facades\Auth;
use App\Repositories\User\Bill\BillRepositories;
use App\Repositories\User;
use App\Enums\Bill;
class TransactionRepositories extends BaseRepositories implements TransactionInterface
{
    protected $model;
    protected $columSearch = ['username', 'phoneNumber', 'email', 'fullname'];
    protected $columSelect = ['id', 'fullname', 'username'];


    public function __construct(TransactionModel $model)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function create($request)
    {

        $this->model->billId =  $request->billId;
        $this->model->userId =  $request->is('admin*') ? $request->userId : Auth::user()->id;
        $this->model->totalMoney =  $request->totalMoney;
        $this->model->status = $request->is('admin*') ? Bill::APPROVED : Bill::NOTAPPROVEDYET ;
        $this->model->image = app(Firebase::class)->uploadImage($request->file('image'));
        $this->model->created_at = Carbon::now();
        return $this->model->save();
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
        return $data->delete();
    }
}
