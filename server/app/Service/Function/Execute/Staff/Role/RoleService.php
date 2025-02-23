<?php

namespace App\Service\Function\Execute\Staff\Role;

use App\Http\Requests\RoleRequest;
use App\Repositories\Staff\Role\RoleInterface;
use Carbon\Carbon;

class RoleService implements RoleServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(RoleRequest $request, RoleInterface $repository)
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
