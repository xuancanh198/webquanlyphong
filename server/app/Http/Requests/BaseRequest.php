<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Service\Function\ServiceFunction\ConvertData;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class BaseRequest extends FormRequest
{
    protected $ConvertData;
    protected $defaultMessages = [];

    public function __construct(ConvertData $ConvertData)
    {
        parent::__construct();
        $this->ConvertData = $ConvertData;
        $this->initializeMessages();
    }

    protected function returnFailedValidation($errorMessage)
    {
        $response = response()->json([
            'status' => 'error',
            'message' =>trans('message.errorMessage'),
            'errors' => $errorMessage,
        ], 422);
        throw new ValidationException($this->validator, $response);
    }

    protected function failedValidation(Validator $validator)
    {
        $this->returnFailedValidation($validator->errors()->toArray());
    }

    protected function checkFilterTime($start, $end, $type)
    {
        $messages = [];
        if($start === null &&  $end === null && $type === null) {
            return [];
        }
        if ($start === null || $end === null || $type === null) {
            $messages[] = trans('message.filter_time_required');
        } else {
            if (strtotime($start) > strtotime($end)) {
                $messages[] = trans('message.end_greater_than_start');
            }
        }
        return $messages;
    }
    public function prepareForValidation()
    {
        $data = [];
        if($this->isMethod('put') || $this->isMethod('delete')){
           $data['id'] =  $this->route('id');
        }
        if ($this->start) {
            $data['start'] = $this->ConvertData->convertToDate($this->start);
        }

        if ($this->end) {
            $data['end'] = $this->ConvertData->convertToDate($this->end);
        }

        if ($this->excel) {
            $data['excel'] = $this->ConvertData->convertToBool($this->excel);
        }
        if (!empty($data)) {
            $this->merge($data);
        }
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $messages = [];

            if ($this->has('start') && !$this->start) {
                $messages[] = trans('message.start_date_format');
            }

            if ($this->has('end') && !$this->end) {
                $messages[] = trans('message.end_date_format');
            }
            if ($this->has('excel') && $this->excel === false) {
                $messages[] = trans('message.invalid_excel_value');
            }

            $messages = array_merge($messages, $this->checkFilterTime($this->start, $this->end, $this->typeTime));

            if (!empty($messages)) {
                foreach ($messages as $message) {
                    $validator->errors()->add('validate_error', $message);
                }
            }
        });
    }

    protected function getMethodIdDeleteAndUpdat($table)
    {
        return ['id' => "required|integer|exists:$table,id"];
    }

    protected function getMethodGet()
    {
        return [
            'page' => 'nullable|integer|min:1',
            'limit' => 'nullable|integer|min:1',
            'search' => 'nullable|string|min:1|max:255',
            'start' => 'nullable',
            'end' => 'nullable',
            'typeTime' => 'nullable|in:created_at,updated_at',
            'filtersBase64' => "nullable|string"
        ];
    }
    public function attributesBase()
    {
        return [
            'page' => trans('message.page') ,
            'limit' => trans('message.limit') ,
            'typeTime' => trans('message.typeTime') ,
            'start' => trans('message.start') ,
            'end' => trans('message.end') ,
            'search' => trans('message.search') ,
        ];
    }
    protected function initializeMessages()
    {
        $this->defaultMessages = [
            'required' => trans('message.required'),
            'email' => trans('message.email'),
            'max' => trans('message.max'),
            'min' => trans('message.min'),
            'min_string' => trans('message.min_string'),
            'min_numeric' => trans('message.min_numeric'),
            'min_array' => trans('message.min_array'),
            'integer' => trans('message.integer'),
            'string' => trans('message.string'),
            'date' => trans('message.date'),
            'unique' => trans('message.unique'),
            'in' => trans('message.in'),
            'exists' => trans('message.exists'),
            'file' => trans('message.file'),
            'image' => trans('message.image'),
            'regex' => trans('message.regex'),
            'before' => trans('message.before'),
            'before_or_equal' => trans('message.before_or_equal'),
            'nullable' => trans('message.nullable'),
            'numeric' => trans('message.numeric'),
        ];
    }
    
    public function generateMessages(array $rules)
    {
        $messages = [];
        $attributes = $this->attributes(); 
    
        foreach ($rules as $field => $fieldRules) {
            $fieldRulesArray = explode('|', $fieldRules);
            foreach ($fieldRulesArray as $rule) {
                if (strpos($rule, ':') !== false) {
                    [$ruleName, $ruleValue] = explode(':', $rule);
    
                    if ($ruleName === 'min') {
                        if (is_numeric($ruleValue)) {
                            $messages["{$field}.{$ruleName}"] = str_replace(
                                [':attribute', ":{$ruleName}"],
                                [$attributes[$field] ?? $field, $ruleValue], 
                                $this->defaultMessages['min_numeric'] ?? "{$field} must be at least :{$ruleName}."
                            );
                        } elseif (is_array($this->$field)) {
                            $messages["{$field}.{$ruleName}"] = str_replace(
                                [':attribute', ":{$ruleName}"],
                                [$attributes[$field] ?? $field, $ruleValue], 
                                $this->defaultMessages['min_array'] ?? "{$field} must have at least :{$ruleName} items."
                            );
                        } else {
                            $messages["{$field}.{$ruleName}"] = str_replace(
                                [':attribute', ":{$ruleName}"],
                                [$attributes[$field] ?? $field, $ruleValue], 
                                $this->defaultMessages['min_string'] ?? "{$field} must be at least :{$ruleName} characters."
                            );
                        }
                    } else {
                        $messages["{$field}.{$rule}"] = str_replace(
                            ':attribute',
                            $attributes[$field] ?? $field,
                            $this->defaultMessages[$rule] ?? "{$field}.{$rule} không hợp lệ."
                        );
                    }
                } else {
                    $messages["{$field}.{$rule}"] = str_replace(
                        ':attribute',
                        $attributes[$field] ?? $field,
                        $this->defaultMessages[$rule] ?? "{$field}.{$rule} không hợp lệ."
                    );
                }
            }
        }
    
        return $messages;
    }
    
}
