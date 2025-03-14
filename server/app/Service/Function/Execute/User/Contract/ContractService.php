<?php

namespace App\Service\Function\Execute\User\Contract;

use App\Http\Requests\ContractRequest;
use App\Repositories\User\Contract\ContractInterface;
use Carbon\Carbon;

class ContractService implements ContractServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(ContractRequest $request, ContractInterface $repository)
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
    public function checkIsStillValid($data)
    {
      
        $getDataContractByRoomId = $this->repository->getLastContractByRoomId($data['roomId']);
        if (!$getDataContractByRoomId) {
            return false;
        }

        $startDate = Carbon::parse($data['startTime']);
        $endDate = Carbon::parse($data['endTime']);

        $existingStart = $getDataContractByRoomId->startTime;
        $existingEnd = $getDataContractByRoomId->endTime;
        if (
            ($startDate->between($existingStart, $existingEnd)) ||
            ($endDate->between($existingStart, $existingEnd)) ||
            ($startDate <= $existingStart && $endDate >= $existingEnd)
        ) {
            return true;
        }

        return false;
    }
}
