<?php

namespace App\Service\Function\Execute\Room\Buidling;

use App\Http\Requests\BuildingRequest;
use App\Repositories\Room\Building\BuildingInterface;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;
use App\Enums\BaseRequestAttribute;
class BuidlingService implements BuidlingInterface
{
    protected $request;

    protected $repository;
    public function __construct(BuildingRequest $request, BuildingInterface $repository)
    {
        $this->request = $request;
        $this->repository = $repository;
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
        ];
        return $this->repository->getList($data);
    }
    public function createAction()
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
            'numberFloor' => $this->request->numberFloor,
            'numbeRoomsRent' => $this->request->numbeRoomsRent,
            'address' => $this->request->address,
            'long' => $this->request->long,
            'lat' => $this->request->lat,
            'note' => $this->request->note,
            'image' => app(Firebase::class)->uploadImage($this->request->file('image')),
        ];
        return $this->repository->create($data);
    }

    public function updateAction($id)
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
            'numberFloor' => $this->request->numberFloor,
            'numbeRoomsRent' => $this->request->numbeRoomsRent,
            'address' => $this->request->address,
            'long' => $this->request->long,
            'lat' => $this->request->lat,
            'note' => $this->request->note,
            'image' => app(Firebase::class)->uploadImage($this->request->file('image')),
        ];
        return $this->repository->update($this->request, $id);
    }

    public function deleteAction($id)
    {
        return $this->repository->delete($id);
    }
}
