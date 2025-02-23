<?php

namespace App\Repositories\Staff\Role;

use App\Models\Staff\RoleModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\ServiceFunction\ConvertData;

class RoleRepositories extends BaseRepositories implements RoleInterface
{
    protected $model;
    protected $columSearch = ['name'];

    public function __construct(RoleModel $model)
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
        $filtersBase64 = $request->filtersBase64 ?? null;
        $model = $this->model->with(['staffs']);
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64);
        $result->each(function ($role) {
            $permissions = $role->permissions();
            $role->permission_detail = $permissions;
        });
        return $result;
    }
    public function create($request)
    {
        $this->model->name =  $request->name;
        $this->model->role_detail =  app(ConvertData::class)->convertArrayToKeyValue($request->arrPemisstionDetail);
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->role_detail =  app(ConvertData::class)->convertArrayToKeyValue($request->arrPemisstionDetail);
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
