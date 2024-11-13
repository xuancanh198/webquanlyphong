<?php
namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class RoomRequest extends BaseRequest
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
                'typeRoomId' => 'required|integer|exists:tbl_type_room,id', 
                'floorId' => 'required|integer|exists:tbl_floor,id', 
                'buildingId' => 'required|integer|exists:tbl_building_manager,id',  
                'length' => 'required|numeric|min:1',
                'width' => 'required|numeric|min:1',
                'height' => 'required|numeric|min:1',
                'acreage' => 'required|numeric|min:1',
                'price' => 'required|numeric|min:0',
                'furniture' => 'required|array|min:1',
                'service' => 'required|array|min:1',
                'note' => 'nullable|string|min:1',
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_room,code,';
                $rule['images'] = 'required|array|min:1';
                $rule['images.*'] = 'image|mimes:jpg,jpeg,png,gif|max:20480'; 
            }
            elseif($this->isMethod('put')){
                $rule['code'] .= '|unique:tbl_room,code,' .$this->id;
                if ($this->hasFile('images')) {
                    $rule['images'] = 'nullable|array';
                    $rule['images.*'] = 'image|mimes:jpg,jpeg,png,gif|max:20480'; 
                }
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_room'));
            }
           
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule =$this->getMethodIdDeleteAndUpdat('tbl_service');
        }

        return $rule;
    }

    public function messages()
    {
        return $this->generateMessages($this->rules());
    }

    public function attributes()
    {
        return [
            'name' => trans('message.nameRoom'),
            'code' => trans('message.codeRoom'),
            'typeRoomId' => trans('message.typeRoomRoom'),
            'floorId' => trans('message.floorRoom'),
            'buildingId' => trans('message.buildingRoom'),
            'length' => trans('message.lengthRoom'),
            'width' => trans('message.widthRoom'),
            'height' => trans('message.heightRoom'),
            'acreage' => trans('message.acreageRoom'),
            'price' => trans('message.priceRoom'),
            'note' => trans('message.noteRoom'),
            'service' => trans('message.serviceRoom'),
            'furniture' => trans('message.furnitureRoom'),
            'images' => trans('message.imagesRoom')
        ];
    }    
}
