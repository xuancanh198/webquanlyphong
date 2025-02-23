<?php

namespace App\Service\Function\Execute\Staff\Staff;

use App\Http\Requests\StaffRequest;
use App\Repositories\Staff\Staff\StaffInterface;
use Carbon\Carbon;

class StaffService implements StaffServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(StaffRequest $request, StaffInterface $repository)
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
