<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class SettingRequest extends BaseRequest
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
                'key' => 'required|string|min:2|max:255',
                'value' => 'required|string|min:2|max:255',
            ];
            if($this->isMethod('post')){
                $rule['key'] .= '|unique:tbl_setting,key,';
            }
            elseif($this->isMethod('put')){
                $rule['key'] .= '|unique:tbl_setting,key,' .$this->id;
                
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_setting'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_setting');
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
            'key' => trans('message.keySetting'), 
            'value' => trans('message.valueSetting'), 
            'id' => trans('message.idSetting'), 
        ]));
    }
}
