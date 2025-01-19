<?php

namespace App\Service\Function\Execute;

use App\Models\System\LogActiveModel;
use App\Http\Requests\LogActiveRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;

class LogActiveService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['description'];
    protected $columSelect = ['id', 'log_name', 'event', 'subject_type'];
    public function __construct(LogActiveModel $model, LogActiveRequest $request)
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
        $isSelect = $this->request->isSelect ?? false;
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $filterBaseDecode = $this->request->filterBaseDecode ?? null;
        $result = $this->getListBaseFun($this->model,$page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }

    public function deleteAction($id)
    {
        $data= $this->model->find($id);
        return $data->delete();
    }
}
