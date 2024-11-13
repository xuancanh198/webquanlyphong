<?php

namespace App\Http\Requests;
use App\Http\Requests\BaseRequest;

class UserRequest extends BaseRequest
{
    public function authorize(): bool
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
                'identificationCard' => 'required|string|regex:/^[0-9]+$/|min:9|max:12',
                'email' => 'required|email|min:5|max:255',
                'phoneNumber' => 'required|string|min:10|max:15|regex:/^[0-9]+$/',
                'note' => 'nullable|string|',
                'dateOfBirth' => 'required|date|before:today',
                'dateIssuanceCard' => 'required|date|before_or_equal:today',
                'placeIssue' => 'required|string|min:3|max:255'
            ];
            if($this->isMethod('post')){
                $rule['username'] .= '|unique:tbl_user,username,';
                $rule['email'] .= '|unique:tbl_user,email,';
                $rule['phoneNumber'] .= '|unique:tbl_user,phoneNumber,';
                $rule['image'] = 'required|file|image|max:2048';
                $rule['password'] = 'required|string|min:5|max:255';
            }
            elseif($this->isMethod('put')){
                $rule['image'] = 'nullable|file|image|max:2048';
                $rule['passwordDefault'] = 'required|string|min:5|max:255';
                $rule['username'] .= '|unique:tbl_user,username,'.$this->id;
                $rule['email'] .= '|unique:tbl_user,email,'.$this->id;
                $rule['phoneNumber'] .= '|unique:tbl_user,phoneNumber,'.$this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_user'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_user');
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
           'username' => trans('message.usernameUser'),
            'fullname' => trans('message.fullnameUser'),
            'address' => trans('message.addressUser'),
            'identificationCard' => trans('message.identificationCardUser'),
            'email' => trans('message.emailUser'),
            'phoneNumber' => trans('message.phoneNumberUser'),
            'note' => trans('message.noteUser'),
            'dateOfBirth' => trans('message.dateOfBirthUser'),
            'dateIssuanceCard' => trans('message.dateIssuanceCardUser'),
            'placeIssue' => trans('message.placeIssueUser'),
            'image' => trans('message.imageUser'),
            'password' => trans('message.passwordUser'),
            'passwordDefaultUser' => trans('message.passwordDefault'),
        ]);
    }    
}
