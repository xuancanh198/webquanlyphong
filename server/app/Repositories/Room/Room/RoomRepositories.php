<?php

namespace App\Repositories\Room\Room;

use App\Models\Room\RoomModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Room;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
class RoomRepositories extends BaseRepositories implements RoomInterface
{
    protected $model;

    protected $columSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    protected $columSelect = ColumnTableEnums::COLUMNTABLESELECTROOM;

    public function __construct(RoomModel $model)
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
        $isSelect = $data['isSelect']  ?? BaseRequestAttribute::DEFAULT_NULL;
        $filterBaseDecode = $data['filterBaseDecode'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $model = $this->model;
        if ($isSelect !== true) {
            $model = $model->with([
                'img',
                'service_room.service' => function ($query) {
                    $query->select('id', 'name');
                },
                'furniture_room.furniture' => function ($query) {
                    $query->select('id', 'name');
                },
                'building' => function ($query) {
                    $query->select('id', 'name');
                },
                'floor' => function ($query) {
                    $query->select('id', 'name');
                },
                'type_room' => function ($query) {
                    $query->select('id', 'name');
                }
            ]);
        }
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        return $result;
    }
    public function create($data)
    {
        $this->model->name = $data['name'];
        $this->model->code =  $data['code'];
        $this->model->typeRoomId =  $data['typeRoomId'];
        $this->model->floorId = $data['floorId'];
        $this->model->buildingId = $data['buildingId'];
        $this->model->length =  $data['length'];
        $this->model->width =  $data['width'];
        $this->model->height =  $data['height'];
        $this->model->acreage =  $data['acreage'];
        $this->model->status =  1;
        $this->model->price = $data['price'];
        $this->model->note =  $data['note'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model);
    }

    public function update($data, $id)
    {

        $data = $this->model->find($id);
        $data->name = $data['name'];
        $data->code = $data['code'];
        $data->typeRoomId = $data['typeRoomId'];
        $data->floorId =  $data['floorId'];
        $data->buildingId =  $data['buildingId'];
        $data->length =  $data['length'];
        $data->width =  $data['width'];
        $data->height =  $data['height'];
        $data->acreage =  $data['acreage'];
        $data->price =  $data['price'];
        $data->note =  $data['note'];
        $data->updated_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($data);
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
