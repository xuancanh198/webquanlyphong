<?php

namespace App\Service\Function\Execute;

use App\Models\Permisstion\PermisstionDetailModel;
use App\Http\Requests\PermisstionDetailRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;

class PermisstionDetailService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['name', 'code'];
    protected $columSelect = ['id', 'name', 'code'];
    public function __construct(PermisstionDetailModel $model, PermisstionDetailRequest $request)
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
        $model = $isSelect === false ? $this->model->with([
        'acction' => function ($query) {
            $query->select('id', 'name','code'); 
        } ,
        'permission' => function ($query) {
            $query->select('id', 'name','code'); 
        } ]) : $this->model;
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function createAction()
    {
        $this->model->name =  $this->request->name;
        $this->model->code =  $this->request->code;
        $this->model->permissionId =  $this->request->permissionId;
        $this->model->acctionId =  $this->request->acctionId;
        $this->model->url  =  $this->request->url ;
        $this->model->status =  1;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->name = $this->request->name;
        $data->code = $this->request->code;
        $data->permissionId = $this->request->permissionId;
        $data->acctionId = $this->request->acctionId;
        $data->url = $this->request->url;
        $data->updated_at = Carbon::now();
        return $data->save();
    }
    public function deleteAction($id)
    {
        $data= $this->model->find($id);
        return $data->delete();
    }
}
