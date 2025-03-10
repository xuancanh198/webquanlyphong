<?php

namespace App\Service\Function\Execute\Room\Room;

use App\Http\Requests\RoomRequest;
use App\Repositories\Room\Room\RoomInterface;
use Carbon\Carbon;
use App\Service\Function\Action\Room;
use Illuminate\Support\Facades\DB;
use App\Enums\BaseRequestAttribute;
use App\Models\Room\RoomModel;
class RoomService implements RoomServiceInterface
{
    protected $request;

    protected $repository;

    protected $model;
    public function __construct(RoomRequest $request, RoomInterface $repository, RoomModel $model,)
    {
        $this->request = $request;
        $this->repository = $repository;
        $this->model = $model;
    }
    public function getList()
    {
        $data = [
            'page' => $this->request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $this->request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $this->request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $this->request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'typeTime' => $this->request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $this->request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $this->request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $this->request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
            'isSelect' => $this->request->isSelect ?? BaseRequestAttribute::DEFAULT_NULL,
            'filterBaseDecode' => $this->request->filterBaseDecode ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getList($data);
    }
    public function createAction()
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
            'typeRoomId' => $this->request->typeRoomId,
            'floorId' => $this->request->floorId,
            'buildingId' => $this->request->buildingId,
            'length' => $this->request->length,
            'width' => $this->request->width,
            'height' => $this->request->height,
            'acreage' => $this->request->acreage,
            'price' => $this->request->price,
            'note' => $this->request->note,
        ];
        DB::beginTransaction();
        $addRoom = $this->repository->create($data);
        $addRoomImg =  app(Room::class)->roomImg($this->request->images, $this->model->id);
        $addRoomService =  app(Room::class)->roomService($this->request->service, $this->model->id);
        $addRoomFurniture =  app(Room::class)->roomFurniture($this->request->furniture, $this->model->id);
        DB::commit();
        return $addRoom === true  && $addRoomImg === true && $addRoomService === true && $addRoomFurniture === true ? true : false;
    }

    public function updateAction($id)
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
            'typeRoomId' => $this->request->typeRoomId,
            'floorId' => $this->request->floorId,
            'buildingId' => $this->request->buildingId,
            'length' => $this->request->length,
            'width' => $this->request->width,
            'height' => $this->request->height,
            'acreage' => $this->request->acreage,
            'price' => $this->request->price,
            'note' => $this->request->note,
        ];

        DB::beginTransaction();
        try {
            $updateRoom = $this->repository->update($data, $id);

            $updateRoomImg = true;
            if ($this->request->hasFile('images')) {
                $updateRoomImg = app(Room::class)->updateRoomImg($this->request->images, $id);
            }

            $updateRoomService = app(Room::class)->updateRoomService($this->request->service, $id);

            $updateRoomFurniture = app(Room::class)->updateRoomFurniture($this->request->furniture, $id);

            if ($updateRoom && $updateRoomImg && $updateRoomService && $updateRoomFurniture) {
                DB::commit();
                return true;
            } else {
                DB::rollback();
                return false;
            }
        } catch (\Exception $e) {
            DB::rollback();
            return false;
        }
    }


    public function deleteAction($id)
    {
        DB::beginTransaction();
        try {
            $deleteRoomImg = app(Room::class)->deleteRoomImgAll($id);
            $deleteRoomService = app(Room::class)->deleteRoomServiceAll($id);
            $deleteRoomFurniture = app(Room::class)->deleteRoomFurnitureAll($id);
            $deleteRoom = $this->repository->delete($id);
            DB::commit();
            return $deleteRoom && $deleteRoomImg && $deleteRoomService && $deleteRoomFurniture;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }
}
