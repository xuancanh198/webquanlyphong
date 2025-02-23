<?php

namespace App\Repositories\Permisstion\PermisstionDetail;

use App\Models\Permisstion\PermisstionDetailModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class PermisstionDetailRepositories extends BaseRepositories implements PermisstionDetailInterface
{
    protected $model;
    protected $columSearch = ['name', 'code'];
    protected $columSelect = ['id', 'name', 'code'];
    public function __construct(PermisstionDetailModel $model)
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
        $filtersBase64 = $equest->filtersBase64 ?? null;
        $filterBaseDecode = $request->filterBaseDecode ?? null;
        $model = $isSelect === false ? $this->model->with([
            'acction' => function ($query) {
                $query->select('id', 'name', 'code');
            },
            'permission' => function ($query) {
                $query->select('id', 'name', 'code');
            }
        ]) : $this->model;
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function create($request)
    {
        $this->model->name =  $request->name;
        $this->model->code =  $request->code;
        $this->model->permissionId =  $request->permissionId;
        $this->model->acctionId =  $request->acctionId;
        $this->model->url  =  $request->url;
        $this->model->status =  1;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->permissionId = $request->permissionId;
        $data->acctionId = $request->acctionId;
        $data->url = $request->url;
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
