<?php

namespace App\Service\Function\Execute\User\User;

use App\Http\Requests\UserRequest;
use App\Repositories\User\User\UserRepositories;
use Carbon\Carbon;

class UserService implements UserServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(UserRequest $request, UserRepositories $repository)
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
