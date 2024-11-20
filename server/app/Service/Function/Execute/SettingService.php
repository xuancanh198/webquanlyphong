<?php

namespace App\Service\Function\Execute;

use App\Models\System\SettingModel;
use App\Http\Requests\SettingRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;

class SettingService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['key', 'value'];
    public function __construct(SettingModel $model, SettingRequest $request)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64);
        return $result;
    }
    public function createAction()
    {
        $this->model->key =  $this->request->key;
        $this->model->value =  $this->request->value;
        $this->model->note =   $this->request->note;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->key = $this->request->key;
        $data->value = $this->request->value;
        $data->note = $this->request->note;
        $data->updated_at = Carbon::now();
        return $data->save();
    }
    public function deleteAction($id)
    {
        $data= $this->model->find($id);
        return $data->delete();
    }
}
