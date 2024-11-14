<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContractResource extends JsonResource
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
            'price_time' => $this->priceTime,
            'deposit' => $this->deposit,
            'start_time' => $this->startTime,
            'end_time' => $this->endTime,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'img' => $this->img,

            'custormer' => $this->customer,
            'service' => $this->service,
            'furniture' => $this->furniture,
            'user' => $this->user,
            'room' => $this->room,
            'user' => $this->user,
        ];
    }
}
