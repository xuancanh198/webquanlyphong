<?php

namespace App\Repositories\Room\Building;

use App\Models\Room\BuildingModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
class BuildingRepositories extends BaseRepositories implements BuildingInterface
{
    protected $model;
    protected $columSearch = ['name', 'code'];

    public function __construct(BuildingModel $model)
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
        $this->model->code = $request->code;
        $this->model->image =   app(Firebase::class)->uploadImage($request->file('image'));
        $this->model->numberFloor =  $request->numberFloor;
        $this->model->numbeRoomsRent =  $request->numbeRoomsRent;
        $this->model->address =  $request->address;
        $this->model->long =  $request->long;
        $this->model->lat =  $request->lat;
        $this->model->note =  $request->note;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->numberFloor = $request->numberFloor;
        $data->numbeRoomsRent = $request->numbeRoomsRent;
        $data->address = $request->address;
        $data->long = $request->long;
        $data->lat = $request->lat;
        $data->note = $request->note;
        if ($request->hasFile('image')) {
            $data->image = app(Firebase::class)->uploadImage($request->file('image'));
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
