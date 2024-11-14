<?php

namespace App\Service\Function\Execute;

use App\Models\User\ContractModel;
use App\Http\Requests\ContractRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Room;

class ContractService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['name', 'code'];
    public function __construct(ContractModel $model, ContractRequest $request)
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
        $model = $this->model->with([
            'customer.user' => function ($query) {
                $query->select('id', 'fullname');
            },
            'service.service' => function ($query) {
                $query->select('id', 'name','price','unit');
            },
            'furniture.furniture' => function ($query) {
                $query->select('id', 'name','price');
            },
            'user' => function ($query) {
                $query->select('id', 'fullname');
            },
            'staff' => function ($query) {
                $query->select('id', 'fullname');
            },
            'room' => function ($query) { 
                $query->select('id', 'name', 'buildingId','floorId');
            },
            'room.floor' => function ($query) { 
                $query->select('id', 'name','code');
            },
            'room.building' => function ($query) { 
                $query->select('id', 'name', 'code', 'address');
            },
        ]);
        
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end);
        return $result;
    }
    public function createAction()
    {
        $this->model->name =  $this->request->name;
        $this->model->code =  $this->request->code;
        $this->model->typeRoomId =  $this->request->typeRoomId;
        $this->model->floorId =  $this->request->floorId;
        $this->model->buildingId =  $this->request->buildingId;
        $this->model->length =  $this->request->length;
        $this->model->width =  $this->request->width;
        $this->model->height =  $this->request->height;
        $this->model->acreage =  $this->request->acreage;
        $this->model->status =  1;
        $this->model->price =  $this->request->price;
        $this->model->note =  $this->request->note;
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();
        $addRoom = $this->model->save();
        $addRoomImg =  app(Room::class)->roomImg( $this->request->images, $this->model->id);
        $addRoomService =  app(Room::class)->roomService($this->request->service, $this->model->id);
        $addRoomFurniture =  app(Room::class)->roomFurniture($this->request->furniture, $this->model->id);
        DB::commit();
        return $addRoom === true  && $addRoomImg === true && $addRoomService === true && $addRoomFurniture === true ? true : false;
    }
    public function updateAction($id)
    {
        
        $data = $this->model->find($id);
        $data->name = $this->request->name;
        $data->code = $this->request->code; 
        $data->typeRoomId =  $this->request->typeRoomId;
        $data->floorId =  $this->request->floorId;
        $data->buildingId =  $this->request->buildingId;
        $data->length =  $this->request->length;
        $data->width =  $this->request->width;
        $data->height =  $this->request->height;
        $data->acreage =  $this->request->acreage;
        $data->price =  $this->request->price;
        $data->note =  $this->request->note;
        $data->updated_at = Carbon::now();
        DB::beginTransaction();
        $addRoom = $data->save();
        $addRoomImg = true;
        if($this->request->hasFile('images')){
            $addRoomImg =  app(Room::class)->updateRoomImg( $this->request->images, $id);
        }
        $addRoomService =  app(Room::class)->updateRoomService($this->request->service, $id);
        $addRoomFurniture =  app(Room::class)->updateRoomFurniture($this->request->furniture, $id);
        DB::commit();
        return $addRoom === true  && $addRoomImg === true && $addRoomService === true && $addRoomFurniture === true ? true : false;
    }
    public function deleteAction($id)
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
