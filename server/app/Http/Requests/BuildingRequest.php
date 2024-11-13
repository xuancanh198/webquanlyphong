<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;
class BuildingRequest extends BaseRequest
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
                'numberFloor' => 'required|integer|min:1', 
                'numbeRoomsRent' => 'required|integer|min:1',
                'address' => 'required|string|min:1',
                'long' => 'required|numeric|min:-180|max:180', 
                'lat' => 'required|numeric|min:-90|max:90', 
                'note' => 'nullable|string|min:1', 
            ];
            
            if($this->isMethod('post')){
                $rule['image'] = 'required|file|image|max:20480';
                $rule['code'] .= '|unique:tbl_building_manager,code,';
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_building_manager,code,' .$this->id;
                $rule['image'] = 'nullable|';
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_building_manager'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_building_manager');
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
        'name' => trans('message.nameBuilding'), 
        'code' => trans('message.codeBuilding'), 
        'numberFloor' => trans('message.numberFloorBuilding'), 
        'numbeRoomsRent' => trans('message.numberRoomsBuilding'), 
        'address' => trans('message.addressBuilding'), 
        'long' => trans('message.longitudeBuilding'), 
        'lat' => trans('message.latitudeBuilding'), 
        'note' => trans('message.noteBuilding'), 
        'image' => trans('message.imageBuilding'),
        'id' => trans('message.idBuilding'), 
        ]));
    }
}
