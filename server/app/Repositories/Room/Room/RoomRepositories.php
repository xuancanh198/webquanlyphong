<?php

namespace App\Repositories\Room\Room;

use App\Models\Room\RoomModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\Action\Firebase;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Room;
class RoomRepositories extends BaseRepositories implements RoomInterface
{
    protected $model;

    protected $columSearch = ['name', 'code'];
    protected $columSelect = ['id', 'name', 'code'];

    public function __construct(RoomModel $model)
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
    public function create($request)
    {
        $this->model->name =  $request->name;
        $this->model->code =  $request->code;
        $this->model->typeRoomId =  $request->typeRoomId;
        $this->model->floorId =  $request->floorId;
        $this->model->buildingId =  $request->buildingId;
        $this->model->length =  $request->length;
        $this->model->width =  $request->width;
        $this->model->height =  $request->height;
        $this->model->acreage =  $request->acreage;
        $this->model->status =  1;
        $this->model->price =  $request->price;
        $this->model->note =  $request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();
        $addRoom = $this->model->save();
        $addRoomImg =  app(Room::class)->roomImg($request->images, $this->model->id);
        $addRoomService =  app(Room::class)->roomService($request->service, $this->model->id);
        $addRoomFurniture =  app(Room::class)->roomFurniture($request->furniture, $this->model->id);
        DB::commit();
        return $addRoom === true  && $addRoomImg === true && $addRoomService === true && $addRoomFurniture === true ? true : false;
    }

    public function update($request, $id)
    {

        $data = $this->model->find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->typeRoomId =  $request->typeRoomId;
        $data->floorId =  $request->floorId;
        $data->buildingId =  $request->buildingId;
        $data->length =  $request->length;
        $data->width =  $request->width;
        $data->height =  $request->height;
        $data->acreage =  $request->acreage;
        $data->price =  $request->price;
        $data->note =  $request->note;
        $data->updated_at = Carbon::now();
        DB::beginTransaction();
        $addRoom = $data->save();
        $addRoomImg = true;
        if ($request->hasFile('images')) {
            $addRoomImg =  app(Room::class)->updateRoomImg($request->images, $id);
        }
        $addRoomService =  app(Room::class)->updateRoomService($request->service, $id);
        $addRoomFurniture =  app(Room::class)->updateRoomFurniture($request->furniture, $id);
        DB::commit();
        return $addRoom === true  && $addRoomImg === true && $addRoomService === true && $addRoomFurniture === true ? true : false;
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        DB::beginTransaction();
        try {
            $deleteRoomImg = app(Room::class)->deleteRoomImgAll($id);
            $deleteRoomService = app(Room::class)->deleteRoomServiceAll($id);
            $deleteRoomFurniture = app(Room::class)->deleteRoomFurnitureAll($id);
            $deleteRoom = $data->delete();
            DB::commit();
            return $deleteRoom && $deleteRoomImg && $deleteRoomService && $deleteRoomFurniture;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
