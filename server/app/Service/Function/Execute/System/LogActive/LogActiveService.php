<?php

namespace App\Service\Function\Execute\System\LogActive;

use App\Http\Requests\LogActiveRequest;
use App\Repositories\System\LogActive\LogActiveInterface;
use Carbon\Carbon;

class LogActiveService implements LogActiveServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(LogActiveRequest $request, LogActiveInterface $repository)
    {
        $this->request = $request;
        $this->repository = $repository;
    }
    public function getList()
    {
        return $this->repository->getList($this->request);
    }

    public function deleteAction($id)
    {
        return $this->repository->delete($id);
    }

}
