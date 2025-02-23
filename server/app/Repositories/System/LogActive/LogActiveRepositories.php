<?php

namespace App\Repositories\System\LogActive;

use App\Models\System\LogActiveModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;

class LogActiveRepositories extends BaseRepositories implements LogActiveInterface
{
    protected $model;
    protected $columSearch = ['description'];
    protected $columSelect = ['id', 'log_name', 'event', 'subject_type'];

    public function __construct(LogActiveModel $model)
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
        $filtersBase64 = $request->filtersBase64 ?? null;
        $filterBaseDecode = $request->filterBaseDecode ?? null;
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
