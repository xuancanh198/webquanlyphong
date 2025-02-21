<?php

namespace App\Service\Function\Execute\System\Setting;

use App\Http\Requests\SettingRequest;
use App\Repositories\System\Setting\SettingInterface;
use Carbon\Carbon;

class SettingService implements SettingServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(SettingRequest $request, SettingInterface $repository)
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
