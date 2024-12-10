<?php

namespace App\Service\Function\Execute;

use App\Models\Staff\StaffModel;
use App\Http\Requests\StaffRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;
use App\Models\Staff\RoleModel;
use App\Service\Function\ServiceFunction\ConvertData;
class StaffService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['username', 'phoneNumber', 'email', 'fullname'];
    public function __construct(StaffModel $model, StaffRequest $request)
    {
        $this->model = $model;
        $this->request = $request;
    }
    public function getList()
    {
        $page = $this->request->page ?? 1;
        $limit = $this->request->limit ?? 10;
        $excel = $this->request->excel ?? null;
        $search = $this->request->search ?? null;
        $typeTime = $this->request->typeTime ?? null;
        $start = $this->request->start ?? null;
        $end = $this->request->end ?? null;
        $model = $this->model->with('role');
        $filtersBase64 = $this->request->filtersBase64 ?? null;
        $result = $this->getListBaseFun($model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end, $filtersBase64 );
        $result->each(function ($staff) {
            $permissions = $staff->permissions();
            $staff->permission_detail = $permissions;
        });
        return $result;
    }
    public function createAction()
    {
        $RoleModel = RoleModel::find($this->request->roleId);
        $this->model->role_id =  $this->request->roleId;
        $this->model->fullname =  $this->request->fullname;
        $this->model->username =  $this->request->username;
        $this->model->password =  bcrypt($this->request->password);
        $this->model->phoneNumber =  $this->request->phoneNumber;
        $this->model->role_detail =  $RoleModel->role_detail;
        $this->model->email  =  $this->request->email;
        $this->model->password_default =  $this->request->password;
        $this->model->address =  $this->request->address;
        $this->model->note =  $this->request->note;
        $this->model->img =  app(Firebase::class)->uploadImage($this->request->file('image'));
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->role_id = $this->request->roleId;
        $data->fullname = $this->request->fullname;
        $data->username = $this->request->username;
        $data->role_detail =  app(ConvertData::class)->convertArrayToKeyValue($this->request->arrPemisstionDetail);
        $data->password_default = $this->request->passwordDefault;
        $data->phoneNumber = $this->request->phoneNumber;
        $data->email = $this->request->email;
        $data->address = $this->request->address;
        $data->note = $this->request->note;
        if ($this->request->hasFile('image')) {
            $data->img = app(Firebase::class)->uploadImage($this->request->file('image'));
        }
        $data->updated_at = Carbon::now();
        return $data->save();
    }
    public function deleteAction($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
