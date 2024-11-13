<?php

namespace App\Service\Function\Execute;

use App\Models\Permisstion\PermisstionModel;
use App\Http\Requests\PermisstionRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;

class PermisstionService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['name', 'code'];
    public function __construct(PermisstionModel $model, PermisstionRequest $request)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end);
        return $result;
    }
    public function createAction()
    {
        $this->model->name =  $this->request->name;
        $this->model->code =  $this->request->code;
        $this->model->status =  1;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->name = $this->request->name;
        $data->code = $this->request->code;
        $data->updated_at = Carbon::now();
        return $data->save();
    }
    public function deleteAction($id)
    {
        $data= $this->model->find($id);
        return $data->delete();
    }
}
