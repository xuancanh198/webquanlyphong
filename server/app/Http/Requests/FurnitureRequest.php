<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class FurnitureRequest extends BaseRequest
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
                'name' => 'required|string|min:2|max:255',
                'code' => 'required|string|min:2|max:60',
                'price' => 'required|integer|min:1',
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_furnitures,code,';
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_furnitures,code,' .$this->id;
                
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_furnitures'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_furnitures');
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
            'name' => trans('message.nameFurniture'), 
            'code' => trans('message.codeFurniture'), 
            'id' => trans('message.idFurniture'), 
            'price' => trans('message.priceFurniture'), 
        ]));
    }
}
