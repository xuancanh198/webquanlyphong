<?php

namespace App\Service\Function\Execute;

use App\Models\User\ContractModel;
use App\Http\Requests\ContractRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Service\Function\Action\Contract;
use App\Service\Function\Action\Firebase;
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
        $this->model->priceTime =  $this->request->priceTime;
        $this->model->deposit =  $this->request->deposit;
        $this->model->code =  $this->request->code;
        $this->model->startTime =  $this->request->startTime;
        $this->model->endTime =  $this->request->endTime;
        $this->model->roomId =  $this->request->roomId;
        $this->model->userId =  $this->request->userId;
        $this->model->note =  $this->request->note;
        $this->model->img =  app(Firebase::class)->uploadImage($this->request->file('image'));
        $this->model->created_at = Carbon::now();
        DB::beginTransaction();
        $addContract = $this->model->save();
        $addContractService =  app(Contract::class)->ContractService($this->request->service, $this->model->id);
        $addContractFurniture =  app(Contract::class)->ContractFurniture($this->request->furniture, $this->model->id);
        $addContractcustomers =  app(Contract::class)->ContractCustomers($this->request->customers, $this->model->id);
        DB::commit();
        return $addContract === true && $addContractService === true && $addContractcustomers === true && $addContractFurniture === true ? true : false;
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
        $addContract = $data->save();
        $addContractImg = true;

        $addContractService =  app(Contract::class)->updateRoomService($this->request->service, $id);
        $addContractFurniture =  app(Contract::class)->updateRoomFurniture($this->request->furniture, $id);
        DB::commit();
        return $addContract === true  && $addContractImg === true && $addContractService === true && $addContractFurniture === true ? true : false;
    }
    public function deleteAction($id)
    {
        $data = $this->model->find($id);
        DB::beginTransaction();
        try {
            $deleteRoomService = app(Contract::class)->deleteRoomServiceAll($id);
            $deleteRoomFurniture = app(Contract::class)->deleteRoomFurnitureAll($id);
            $deleteRoom = $data->delete();
            DB::commit();
            return $deleteRoom && $deleteRoomService && $deleteRoomFurniture;
        } catch (\Exception $e) {
            DB::rollBack();
            return false; 
        }
    }
    public function getDataInRoom($roomId, $model, $relationship)
    {
        $modelInstance = new $model();
        return $modelInstance->with($relationship)->where('roomId', $roomId)->get();
    }
}
