<?php

namespace App\Repositories\Staff\Staff;

use App\Models\Staff\StaffModel;
use Carbon\Carbon;
use App\Repositories\BaseRepositories;
use App\Service\Function\ServiceFunction\ConvertData;
use App\Models\Staff\RoleModel;
use Illuminate\Support\Facades\Auth;
use App\Service\Function\Action\Firebase;

class StaffRepositories extends BaseRepositories implements StaffInterface
{
    protected $model;
    protected $columSearch = ['username', 'phoneNumber', 'email', 'fullname'];
    protected $columSelect = ['id', 'fullname', 'username'];

    public function __construct(StaffModel $model)
    {
        $this->model = $model;
    }
    public function getList($request){
        $page = $request->page ?? 1;
        $limit = $request->limit ?? 10;
        $excel = $request->excel ?? null;
        $search = $request->search ?? null;
        $typeTime = $request->typeTime ?? null;
        $start = $request->start ?? null;
        $end = $request->end ?? null;
        $isSelect = $request->isSelect ?? false;
        $filtersBase64 = $request->filtersBase64 ?? null;
        $filterBaseDecode = $request->filterBaseDecode ?? null;
        $model = $this->model->with('role');
        $result = $this->getListBaseFun($model->getInBuilding(), $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end,  $filtersBase64, $isSelect, $this->columSelect, $filterBaseDecode);
        $result->each(function ($staff) {
            $permissions = $staff->permissions();
            $staff->permission_detail = $permissions;
        });
        return $result;
    }
    public function create($request)
    {
        $RoleModel = RoleModel::find($request->roleId);
        $this->model->role_id =  $request->roleId;
        $this->model->buildingId =  Auth::user()->buildingId;
        $this->model->fullname =  $request->fullname;
        $this->model->username =  $request->username;
        $this->model->password =  bcrypt($request->password);
        $this->model->phoneNumber =  $request->phoneNumber;
        $this->model->role_detail =  $RoleModel->role_detail;
        $this->model->email  =  $request->email;
        $this->model->password_default =  $request->password;
        $this->model->address =  $request->address;
        $this->model->note =  $request->note;
        $this->model->img =  app(Firebase::class)->uploadImage($request->file('image'));
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }

    public function update($request, $id)
    {
        $data = $this->model->find($id);
        $data->role_id = $request->roleId;
        $data->fullname = $request->fullname;
        $data->username = $request->username;
        $data->role_detail =  app(ConvertData::class)->convertArrayToKeyValue($request->arrPemisstionDetail);
        $data->password_default = $request->passwordDefault;
        $data->phoneNumber = $request->phoneNumber;
        $data->email = $request->email;
        $data->address = $request->address;
        $data->note = $request->note;
        if ($request->hasFile('image')) {
            $data->img = app(Firebase::class)->uploadImage($request->file('image'));
        }
        $data->updated_at = Carbon::now();
        return $data->save();
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        return $data->delete();
    }
}
