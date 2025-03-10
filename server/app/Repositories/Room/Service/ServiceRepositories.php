<?php

namespace App\Repositories\Room\Service;

use App\Models\Room\ServiceModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
class ServiceRepositories extends BaseRepositories implements ServiceInterface
{
    protected $model;
    protected $columSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(ServiceModel $model)
    {
        $this->model = $model;
    }
    public function getList($data){
        $page = $data['page'] ?? BaseRequestAttribute::PAGE_DEFAULT;
        $limit = $data['limit'] ?? BaseRequestAttribute::LIMIT_DEFAULT;
        $excel = $data['excel'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $search = $data['search'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $typeTime = $data['typeTime'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $start = $data['start'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $end = $data['end'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $filtersBase64 = $data['filtersBase64'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64);
        return $result;
    }
    public function create($data)
    {
        $this->model->name =  $data['name'];
        $this->model->code =  $data['code'];
        $this->model->name =  $data['price'];
        $this->model->code =  $data['unit'];
        $this->model->name =  $data['quantity'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model);
    }

    public function update($data, $id)
    {
        $data = $this->model->find($id);
        $data->name = $data['name'];
        $data->code =  $data['code'];
        $data->price =  $data['price'];
        $data->unit = $data['unit'];
        $data->quantity = $data['quantity'];
        $data->updated_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($data);
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
