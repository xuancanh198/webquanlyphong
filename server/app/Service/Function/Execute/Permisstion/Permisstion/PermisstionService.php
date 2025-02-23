<?php

namespace App\Service\Function\Execute\Permisstion\Permisstion;

use App\Http\Requests\PermisstionRequest;
use App\Repositories\Permisstion\Permisstion\PermisstionInterface;
use Carbon\Carbon;

class PermisstionService implements PermisstionServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(PermisstionRequest $request, PermisstionInterface $repository)
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
