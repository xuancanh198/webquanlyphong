<?php

namespace App\Service\Function\Execute;

use App\Models\Room\BuildingModel;
use App\Http\Requests\BuildingRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;
class BuidlingService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['name', 'code'];
    public function __construct(BuildingModel $model, BuildingRequest $request)
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
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64);
        return $result;
    }
    public function createAction()
    {
        $this->model->name =  $this->request->name;
        $this->model->code =  $this->request->code;
        $this->model->image =   app(Firebase::class)->uploadImage($this->request->file('image'));
        $this->model->numberFloor =  $this->request->numberFloor;
        $this->model->numbeRoomsRent =  $this->request->numbeRoomsRent;
        $this->model->address =  $this->request->address;
        $this->model->long =  $this->request->long;
        $this->model->lat =  $this->request->lat;
        $this->model->note =  $this->request->note;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->name = $this->request->name;
        $data->code = $this->request->code;
        $data->numberFloor = $this->request->numberFloor;
        $data->numbeRoomsRent = $this->request->numbeRoomsRent;
        $data->address = $this->request->address;
        $data->long = $this->request->long;
        $data->lat = $this->request->lat;
        $data->note = $this->request->note;
        if ($this->request->hasFile('image')) {
            $data->image = app(Firebase::class)->uploadImage($this->request->file('image'));
        }
        $data->updated_at = Carbon::now();
        return $data->save();
    }
    public function deleteAction($id)
    {
        $data= $this->model->find($id);
        return $data->delete();
    }
}
