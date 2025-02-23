<?php

namespace App\Http\Controllers\Admin\Permisstion;

use App\Http\Controllers\Controller;
use App\Service\Function\Execute\Permisstion\PermisstionDetail\PermisstionDetailServiceInterface;
use App\Http\Resources\PermisstionDetailResource;
use App\Http\Requests\PermisstionDetailRequest;


class PermisstionDetailController extends Controller
{
    protected $service;
    protected $request;
    public function __construct(PermisstionDetailServiceInterface $service, PermisstionDetailRequest $request)
    {
        $this->service = $service;
        $this->request = $request;
    }
    public function index()
    {
        $result = $this->service->getList();
        return $this->returnResponseBase(PermisstionDetailResource::class, $this->request, $result);
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
