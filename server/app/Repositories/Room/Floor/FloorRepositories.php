<?php

namespace App\Repositories\Room\Floor;

use App\Models\Room\FloorModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class FloorRepositories extends BaseRepositories implements FloorInterface
{
    protected $model;
    protected $columSearch = ['name', 'code'];

    public function __construct(FloorModel $model)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64);
        return $result;
    }
    public function create($request)
    {
        $this->model->name =  $request->name;
        $this->model->code =  $request->code;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
