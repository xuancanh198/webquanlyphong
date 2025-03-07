<?php

namespace App\Repositories\User\Transaction;

use App\Models\User\TransactionModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use Illuminate\Support\Facades\Auth;

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
        $model =  $model = $this->model->with([
            'user' => function ($query) {
                $query->select('id', 'fullname', 'username');
            },
            'bill.room' => function ($query) {
                $query->select('id', 'code', 'name');
            },
            'bill' => function ($query) {
                $query->select('id', 'roomId', 'code', 'status', 'formPayment', 'image', 'started_at', 'ends_at', 'pay_at', 'created_at', 'totalMoney');
            },
        ]);
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function create($data)
    {

        $this->model->billId =  $data['billId'];
        $this->model->userId =   $data['userId'];
        $this->model->totalMoney =  $data['totalMoney'];
        $this->model->status = $data['status'] ;
        $this->model->image =  $data['image'];
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($dataUpdate, $id)
    {
        $data = $this->model->find($id);
        $data->status = $dataUpdate['status'];
        $data->updated_at = Carbon::now();
        $data->save();
        return $data;
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
