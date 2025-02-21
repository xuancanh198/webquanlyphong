<?php

namespace App\Repositories\System\Setting;

use App\Models\System\SettingModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class SettingRepositories extends BaseRepositories implements SettingInterface
{
    protected $model;
    protected $columSearch = ['key', 'value'];

    public function __construct(SettingModel $model)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64);
        return $result;
    }
    public function create($request)
    {
        $this->model->key =  $request->key;
        $this->model->value =  $request->value;
        $this->model->note =   $request->note;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->key = $request->key;
        $data->value = $request->value;
        $data->note = $request->note;
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
