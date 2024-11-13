<?php

namespace App\Http\Requests;
use App\Http\Requests\BaseRequest;


class StaffRequest extends BaseRequest
{    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $rule = []; 
        if ($this->isMethod('post') || $this->isMethod('put')) {
            $rule = [
                'username' => 'required|string|min:4|max:255',
                'fullname' => 'required|string|min:5|max:255',
                'address' => 'required|string|min:1|max:5000',
                'roleId' => 'required|integer|min:1|exists:tbl_role,id',
                'email' => 'required|email|min:5|max:255',
                'phoneNumber' => 'required|string|min:10|max:15|regex:/^[0-9]+$/',
                'note' => 'nullable|string|',
            ];
            if($this->isMethod('post')){
                $rule['username'] .= '|unique:tbl_staff_admin,username,';
                $rule['email'] .= '|unique:tbl_staff_admin,email,';
                $rule['phoneNumber'] .= '|unique:tbl_staff_admin,phoneNumber,';
                $rule['image'] = 'required|file|image|max:2048';
                $rule['password'] = 'required|string|min:5|max:255';
            }
            elseif($this->isMethod('put')){
                $rule['image'] = 'nullable|file|image|max:2048';
                $rule['passwordDefault'] = 'required|string|min:5|max:255';
                $rule['username'] .= '|unique:tbl_staff_admin,username,'.$this->id;
                $rule['email'] .= '|unique:tbl_staff_admin,email,'.$this->id;
                $rule['phoneNumber'] .= '|unique:tbl_staff_admin,phoneNumber,'.$this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_staff_admin'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_staff_admin');
            }
        return $rule;
    }
    
    
    public function messages()
    {
        return $this->generateMessages($this->rules());
    }
    public function attributes()
    {
        $attributes = $this->attributesBase();
        return array_merge($attributes, [
            'usernameStaff' => trans('message.usernameStaff'),
            'passwordStaff' => trans('message.passwordStaff'),
            'fullnameStaff' => trans('message.fullnameStaff'),
            'addressStaff' => trans('message.addressStaff'),
            'roleIdStaff' => trans('message.roleIdStaff'),
            'emailStaff' => trans('message.emailStaff'),
            'phoneNumberStaff' => trans('message.phoneNumberStaff'),
            'imageStaff' => trans('message.imageStaff'),
            'noteStaff' => trans('message.noteStaff'),
        ]);
    }    
}
