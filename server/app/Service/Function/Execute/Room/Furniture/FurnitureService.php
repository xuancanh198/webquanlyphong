<?php

namespace App\Service\Function\Execute\Room\Furniture;

use App\Http\Requests\FurnitureRequest;
use App\Repositories\Room\Furniture\FurnitureRepositories;
use Carbon\Carbon;

class FurnitureService implements FurnitureServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(FurnitureRequest $request, FurnitureRepositories $repository)
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
