<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class PermisstionDetailRequest extends BaseRequest
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
                'name' => 'required|string|min:4|max:255',
                'code' => 'required|string|min:5|max:60',
                'permissionId' => 'required|integer|min:1|exists:tbl_permission,id',
                'acctionId' => 'required|integer|min:1|exists:tbl_acction,id',
                'url' => 'required|string|min:4|max:255',
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_permission_detail,code,';
                $rule['url'] .= '|unique:tbl_permission_detail,url,';
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_permission_detail,code,' .$this->id;
                $rule['url'] .= '|unique:tbl_permission_detail,url,' .$this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_permission_detail'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_permission_detail');
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
       return (array_merge($attributes, [
            'name' => trans('message.namePermisstionDetail'), 
            'code' => trans('message.codePermisstionDetail'), 
            'url' => trans('message.urlPermisstionDetail'), 
            'permissionId' => trans('message.idPermisstion'), 
            'acctionId' => trans('message.namePermisstionDetail'), 
            'id' => trans('message.idAction'), 
        ]));
    }
}
