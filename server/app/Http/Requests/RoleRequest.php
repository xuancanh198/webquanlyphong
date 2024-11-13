<?php

namespace App\Http\Requests;
use App\Http\Requests\BaseRequest;
class RoleRequest extends BaseRequest
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
            ];
            if($this->isMethod('post')){
                $rule['name'] .= '|unique:tbl_role,name,';
            }
            elseif($this->isMethod('put')){
                $rule['name'] .= '|unique:tbl_role,name,' .$this->id;
                
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_role'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_role');
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
            'name' => trans('message.nameRole'), 
            'id' => trans('message.idRole'), 
        ]));
    }
}
