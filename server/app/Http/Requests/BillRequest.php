<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseRequest;

class BillRequest extends BaseRequest
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
                'roomId' => 'integer|min:1|exists:tbl_room,id',
                'note' => 'nullable|string',
            ];
            if ($this->isMethod('post')) {
                $rule['roomId'] .= '|required';
            } elseif ($this->isMethod('put')) {
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_bill'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->getMethodIdDeleteAndUpdat('tbl_bill');
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
            'roomId' => trans('message.idRoom'),
            'id' => trans('message.idBill'),
            'note' => trans('message.noteBill'),
        ]));
    }
}
