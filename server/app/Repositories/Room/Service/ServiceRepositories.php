<?php

namespace App\Repositories\Room\Service;

use App\Models\Room\ServiceModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class ServiceRepositories extends BaseRepositories implements ServiceInterface
{
    protected $model;
    protected $columSearch = ['name', 'code'];

    public function __construct(ServiceModel $model)
    {
        $this->model = $model;
    }
    public function getList($request){
        $page = $this->request->page ?? 1;
        $limit = $this->request->limit ?? 10;
        $excel = $this->request->excel ?? null;
        $search = $this->request->search ?? null;
        $typeTime = $this->request->typeTime ?? null;
        $start = $this->request->start ?? null;
        $end = $this->request->end ?? null;
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64);
        return $result;
    }
    public function create($request)
    {
        $this->model->name =  $request->name;
        $this->model->code =  $request->code;
        $this->model->price =  $request->price;
        $this->model->unit = $request->unit;
        $this->model->quantity =  $request->quantity;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->price = $request->price;
        $data->unit = $request->unit;
        $data->quantity = $request->quantity;
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
