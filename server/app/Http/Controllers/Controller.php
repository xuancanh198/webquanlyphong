<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    public function returnResponseData($status = 'success', $result, $type = "normal")
    {
        return response()->json([
            'status' => $status,
            'type' => $type,
            'result' => $result,
        ]);
    }
    public function returnResponseResult($result, $status = 'success')
    {
        return response()->json([
            'status' => $status,
            'result' => $result,
        ]);
    }
    public function returnResponseBase($resource, $requets, $result)
    {
        if ($requets->excel !== true) {
            $data = $resource::collection($result->items());
            $result->setCollection($data->collect());
        }
        return $this->returnResponseData('success', $result, $requets->excel !== true ? 'normal' : "excel");
    }
    public function returnResponseMessgae($status = "success", $messageKey){
        return response()->json([
            'status' => $status,
            'message' =>    trans('message.acctionMessage', [
                'attribute' => trans("message.$messageKey"),
                'status' => trans("message.$status"),
            ]),
        ]);
    }
}
