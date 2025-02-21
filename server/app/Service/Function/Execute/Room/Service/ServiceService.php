<?php

namespace App\Service\Function\Execute\Room\Service;

use App\Http\Requests\ServiceRequest;
use App\Repositories\Room\Service\ServiceInterface;
use Carbon\Carbon;

class ServiceService implements ServiceServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(ServiceRequest $request, ServiceInterface $repository)
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
