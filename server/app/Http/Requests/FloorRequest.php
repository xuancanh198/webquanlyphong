<?php

namespace App\Http\Requests;
use App\Http\Requests\BaseRequest;

class FloorRequest extends BaseRequest
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
                'code' => 'required|string|min:1|max:60',
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_floor,code,';
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_floor,code,' .$this->id;
                
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_floor'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_floor');
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
                'name' => trans('message.nameFloor'), 
                'code' => trans('message.codeFloor'), 
                'id' => trans('message.idFloor'), 
        ]));
    }
  
}
