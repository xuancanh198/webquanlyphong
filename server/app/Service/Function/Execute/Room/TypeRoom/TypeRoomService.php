<?php

namespace App\Service\Function\Execute\Room\TypeRoom;

use App\Http\Requests\TypeRoomRequest;
use App\Repositories\Room\TypeRoom\TypeRoomInterface;
use Carbon\Carbon;

class TypeRoomService implements TypeRoomServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(TypeRoomRequest $request, TypeRoomInterface $repository)
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
