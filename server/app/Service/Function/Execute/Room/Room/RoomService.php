<?php

namespace App\Service\Function\Execute\Room\Room;

use App\Http\Requests\RoomRequest;
use App\Repositories\Room\Room\RoomInterface;
use Carbon\Carbon;

class RoomService implements RoomServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(RoomRequest $request, RoomInterface $repository)
    {
        $this->request = $request;
        $this->repository = $repository;
    }
    public function getList()
    {
        return $this->repository->getList($this->request);
    }
    public function createAction()
    {
        return $this->repository->create($this->request);
    }

    public function updateAction($id)
    {
        return $this->repository->update($this->request, $id);
    }

    public function deleteAction($id)
    {
        return $this->repository->delete($id);
    }
}
