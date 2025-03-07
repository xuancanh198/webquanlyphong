<?php

namespace App\Http\Requests;
use App\Service\Request\ContractServiceRequest;
use App\Http\Requests\BaseRequest;
class ContractRequest extends BaseRequest
{
   
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        // $data = [
        //     'roomId' => $this->roomId,
        //     'startTime' => $this->startTime,
        //     'endTime' => $this->endTime,
        // ];
        // app(ContractServiceRequest::class)->execute($data);
        $rule = []; 
        if ($this->isMethod('post') || $this->isMethod('put')) {
           
            $rule = [
                'code' => 'required|string|min:1|max:255',
                'priceTime' => 'required|integer|min:1',
                'userId' => 'required|integer|min:1|exists:tbl_user,id',
                'roomId' => 'required|integer|min:1|exists:tbl_room,id',
                'deposit' => 'required|integer|min:1',
                'startTime' => 'required|date',
                'endTime' => 'required|date',
                'note' => 'nullable|string|',
                'service' => 'required|array|min:1',
                'furniture' => 'required|array|min:1',
                'customers' => 'required|array|min:1',
            ];
            if($this->isMethod('post')){
                $rule['code'] .= '|unique:tbl_contract,code';
                $rule['image'] = 'required|file|image|max:2048';
            }
            elseif($this->isMethod('put')){
                $rule['image'] = 'nullable';
                $rule['code'] .= '|unique:tbl_contract,code,'.$this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_contract'));
            }
            } elseif ($this->isMethod('get')) {
                $rule = $this->getMethodGet();
            } elseif ($this->isMethod('delete')) {
                $rule =$this->getMethodIdDeleteAndUpdat('tbl_contract');
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
            'priceTime' => trans('message.priceTimeContract'),
            'userId' => trans('message.idUser'),
            'roomId' => trans('message.idRoom'),
            'deposit' => trans('message.depositContract'),
            'startTime' => trans('message.startTimeContract'),
            'endTime' => trans('message.endTimeContract'),
            'note' => trans('message.noteContract'),
            'service' => trans('message.serviceContract'),
            'furniture' => trans('message.furnitureContract'),
            'customers' => trans('message.customersContract'),
            'code' => trans('message.codeContract'),
            'image' => trans('message.imageContract'),
        ]);
    }    
}
