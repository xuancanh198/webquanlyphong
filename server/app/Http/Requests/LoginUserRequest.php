<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\Login;
class LoginUserRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rule = [];
        if ($this?->typeLogin === Login::LOGINUSERBYEMAIL) {
            $rule = [
                'email' => 'required|email|exists:tbl_user,email'
            ];
        }
        else if($this?->typeLogin === Login::LOGINUSERBYPHONE) {
            $rule = [
                'phoneNumber' => 'required|min:1|max:255|exists:tbl_user,phoneNumber',
            ];
        }
        else{
            $rule = [
                'username' => 'required|min:1|max:255|string|exists:tbl_user,username',
                'password' => 'required|min:1|max:255|string',
            ];
        }
        return $rule;
    }
    public function attributes()
    {
        return 
        [
            'username' => trans('message.usernameUser'),
            'email' => trans('message.emailUser'),
            'phoneNumber' => trans('message.phoneNumberUser'),
            'password' => trans('message.passwordUser'),
        ];
    }
}
