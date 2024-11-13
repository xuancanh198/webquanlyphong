<?php

namespace App\Service\Function\Execute;

use App\Models\User\UserModel;
use App\Http\Requests\UserRequest;
use App\Service\Function\Base\BaseService;
use Carbon\Carbon;
use App\Service\Function\Action\Firebase;
use App\Service\Function\Action\ConvertData;

class UserService extends BaseService
{
    protected $model;
    protected $request;
    protected $columSearch = ['username', 'phoneNumber', 'email', 'fullname'];
    public function __construct(UserModel $model, UserRequest $request)
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
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columSearch, $excel, $typeTime, $start, $end);
        return $result;
    }
    public function createAction()
    {

        $this->model->identificationCard =  $this->request->identificationCard;
        $this->model->fullname =  $this->request->fullname;
        $this->model->username =  $this->request->username;
        $this->model->password =  bcrypt($this->request->password);
        $this->model->phoneNumber =  $this->request->phoneNumber;
        $this->model->email  =  $this->request->email;
        $this->model->password_default =  $this->request->password;
        $this->model->address =  $this->request->address;
        $this->model->dateOfBirth =  app(ConvertData::class)->convertDateTimeFormat($this->request->dateOfBirth);
        $this->model->dateIssuanceCard = app(ConvertData::class)->convertDateTimeFormat($this->request->dateIssuanceCard);
        $this->model->placeIssue =  $this->request->placeIssue;
        $this->model->note =  $this->request->note;
        $this->model->imgLink =  app(Firebase::class)->uploadImage($this->request->file('image'));
        $this->model->status =  1;
        $this->model->isVerifiedInfor = 0;
        $this->model->created_at = Carbon::now();
        return $this->model->save();
    }
    public function updateAction($id)
    {
        $data = $this->model->find($id);
        $data->identificationCard = $this->request->identificationCard;
        $data->fullname = $this->request->fullname;
        $data->username = $this->request->username;
        $data->defaultPassword = $this->request->passwordDefault;
        $data->phoneNumber = $this->request->phoneNumber;
        $data->email = $this->request->email;
        $data->address = $this->request->address;
        $data->note = $this->request->note;
        $data->dateOfBirth = app(ConvertData::class)->convertDateTimeFormat($this->request->dateOfBirth);
        $data->dateIssuanceCard = app(ConvertData::class)->convertDateTimeFormat($this->request->dateIssuanceCard);
        $data->placeIssue = $this->request->placeIssue;
        if ($this->request->hasFile('image')) {
            $data->imgLink = app(Firebase::class)->uploadImage($this->request->file('image'));
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
