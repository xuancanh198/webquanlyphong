<?php

namespace App\Service\Function\Execute\Permisstion\Action;

use App\Http\Requests\ActionRequest;
use App\Repositories\Permisstion\Action\ActionInterface;
use Carbon\Carbon;

class ActionService implements ActionServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(ActionRequest $request, ActionInterface $repository)
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
