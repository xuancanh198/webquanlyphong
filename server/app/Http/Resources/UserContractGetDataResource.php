<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserContractGetDataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'priceTime' => $this->priceTime,
            'deposit' => $this->deposit,
            'img' => $this->img,
            'startTime' => $this->startTime,
            'endTime' => $this->endTime,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
