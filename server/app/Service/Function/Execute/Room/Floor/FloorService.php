<?php

namespace App\Service\Function\Execute\Room\Floor;

use App\Http\Requests\FloorRequest;
use App\Repositories\Room\Floor\FloorInterface;
use Carbon\Carbon;
use App\Enums\BaseRequestAttribute;
class FloorService implements FloorServiceInterface
{
    protected $request;

    protected $repository;
    public function __construct(FloorRequest $request, FloorInterface $repository)
    {
        $this->request = $request;
        $this->repository = $repository;
    }
    public function getList()
    {
        $data = [
            'page' => $this->request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $this->request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $this->request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $this->request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'typeTime' => $this->request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $this->request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $this->request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $this->request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getList($data);
    }
    public function createAction()
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
        ];
        return $this->repository->create($data);
    }

    public function updateAction($id)
    {
        $data = [
            'name' => $this->request->name,
            'code' => $this->request->code,
        ];
        return $this->repository->update($data, $id);
    }

    public function deleteAction($id)
    {
        return $this->repository->delete($id);
    }
}
