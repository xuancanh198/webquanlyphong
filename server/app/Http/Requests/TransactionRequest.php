<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\BaseRequest;
class TransactionRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rule = [];
        if ($this->isMethod('post') || $this->isMethod('put')) {
            $rule = [];
            if ($this->isMethod('post')) {
              
            } elseif ($this->isMethod('put')) {
                $rule['status'] = 'required|integer|in:1,2';
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdat('tbl_transaction'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->getMethodIdDeleteAndUpdat('tbl_transaction');
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
            'status' => trans('message.statusBill'),
        ]);
    }
}
