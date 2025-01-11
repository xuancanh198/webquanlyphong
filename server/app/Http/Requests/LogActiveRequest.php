<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseRequest;

class LogActiveRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        $rule = [];
        if ($this->isMethod('delete')) {
            $rule = $this->getMethodIdDeleteAndUpdat('activity_log');
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
            'id' => trans('message.idFurniture'),
        ]));
    }
}
