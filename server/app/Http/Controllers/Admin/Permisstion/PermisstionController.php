<?php

namespace App\Http\Controllers\Admin\Permisstion;
use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Permisstion\Permisstion\PermisstionServiceInterface;
use App\Http\Resources\PermisionResource;
use App\Http\Requests\PermisstionRequest;

class PermisstionController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(PermisstionServiceInterface $service, PermisstionRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(PermisionResource::class, $this->request, $result);
    }

    public function store() {
        $result = $this->service->createAction();
        return $this->returnResponseMessgae($result ? "success" : "fail",'createAction');
    }
    public function update($id) {
        $result = $this->service->updateAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail",'updateAction');
    }
    public function destroy($id) {
        $result = $this->service->deleteAction($id);
        return $this->returnResponseMessgae($result ? "success" : "fail",'deleteAction');
    }
}
