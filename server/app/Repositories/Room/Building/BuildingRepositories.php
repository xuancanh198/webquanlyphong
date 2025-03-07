<?php

namespace App\Repositories\Room\Building;

use App\Models\Room\BuildingModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use App\Enums\ColumnTableEnums;
use App\Enums\BaseRequestAttribute;
class BuildingRepositories extends BaseRepositories implements BuildingInterface
{
    protected $model;
    protected $columSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(BuildingModel $model)
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
        $this->model->code = $data['code'];
        $this->model->image =  $data['image'];
        $this->model->numberFloor =  $data['numberFloor'];
        $this->model->numbeRoomsRent = $data['numbeRoomsRent'];
        $this->model->address =  $data['address'];
        $this->model->long =  $data['long'];
        $this->model->lat =  $data['lat'];
        $this->model->note =  $data['note'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model);
    }

    public function update($data, $id)
    {
        $data = $this->model->find($id);
        $data->name = $data['name'];
        $data->code = $data['code'];
        $data->numberFloor = $data['numberFloor'];
        $data->numbeRoomsRent = $data['numbeRoomsRent'];
        $data->address = $data['address'];
        $data->long = $$data['long'];
        $data->lat = $data['lat'];
        $data->note = $data['note'];
        $data->image = $data['image'];
        $data->updated_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($data);
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
