<?php

namespace App\Service\Function\Execute\Room\Floor;

use App\Http\Requests\FloorRequest;
use App\Repositories\Room\Floor\FloorInterface;
use Carbon\Carbon;

class FloorService implements FloorServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(FloorRequest $request, FloorInterface $repository)
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
