<?php

namespace App\Repositories\Room\TypeRoom;

use App\Models\Room\TypeRoomModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class TypeRoomRepositories extends BaseRepositories implements TypeRoomInterface
{
    protected $model;
    protected $columSearch = ['name', 'code'];

    public function __construct(TypeRoomModel $model)
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
