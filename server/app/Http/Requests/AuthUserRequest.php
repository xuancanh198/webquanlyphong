<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Login;
class AuthUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
  public function rules(): array
    {
        $rule = []; 
        if ($this->isMethod('post')) {
            if ($this->is('*user/login*')) {
                if(!isset($this->typeLogin)){
                    $rule = [
                        'username' => 'required|string|min:4|max:255|unique:tbl_user,username',
                        'password' => 'required|string|min:5|max:255'
                    ]; 
                }
                if($this->typeLogin === Login::LOGINUSERBYEMAIL){
                    $rule = [
                        'email' => 'required|email|min:5|max:255|unique:tbl_user,email',
                    ];
                }else if($this->typeLogin === Login::LOGINUSERBYEMAIL){
                    $rule = [
                        'phoneNumber' => 'required|string|min:10|max:15|regex:/^[0-9]+$/|unique:tbl_user,phoneNumber',
                    ];
                }else{
                    $rule = [
                        'username' => 'required|string|min:4|max:255|unique:tbl_user,username',
                        'password'=> 'required|string|min:5|max:255'
                    ];
                }
            }
            
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
