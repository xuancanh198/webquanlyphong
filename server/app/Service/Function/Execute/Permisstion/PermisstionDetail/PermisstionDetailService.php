<?php

namespace App\Service\Function\Execute\Permisstion\PermisstionDetail;

use App\Http\Requests\PermisstionDetailRequest;
use App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailInterface;
use Carbon\Carbon;

class PermisstionDetailService implements PermisstionDetailServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(PermisstionDetailRequest $request, PermisstionDetailInterface $repository)
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
