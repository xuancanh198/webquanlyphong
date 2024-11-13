<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class ActionRequest extends BaseRequest
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
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_acction,code,';
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_acction,code,' .$this->id;
                
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_acction'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_acction');
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
            'name' => trans('message.nameAction'), 
            'code' => trans('message.codeAction'), 
            'id' => trans('message.idAction'), 
        ]));
    }
}
