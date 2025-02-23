<?php

namespace App\Service\Function\Execute\User\Bill;

use App\Http\Requests\BillRequest;
use App\Repositories\User\Contract\ContractRepositories;
use Carbon\Carbon;

class BillService implements BillServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(BillRequest $request, ContractRepositories $repository)
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
    public function getDataInRoom($roomId, $model, $relationship)
    {
        $modelInstance = new $model();
        return $modelInstance->with($relationship)->where('roomId', $roomId)->get();
    }
    public function getMyListUser(){
        return $this->repository->getList($this->request);
    }
}
