<?php

namespace App\Service\Function\Execute\Room\Buidling;

use App\Http\Requests\BuildingRequest;
use App\Repositories\Room\Building\BuildingInterface;
use Carbon\Carbon;

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
