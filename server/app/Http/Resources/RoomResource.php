<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'type_room' => $this->type_room ? [
                'id' => $this->type_room->id,
                'name' => $this->type_room->name,
            ] : null,
            'floor' => $this->floor ? [
                'id' => $this->floor->id,
                'name' => $this->floor->name,
            ] : null,
            'building' => $this->building ? [
                'id' => $this->building->id,
                'name' => $this->building->name,
            ] : null,
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,
            'acreage' => $this->acreage,
            'status' => $this->status,
            'price' => $this->price,
            'name' => $this->name,
            'code' => $this->code,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'img' => $this->img->map(function ($img) {
                return [
                    'id' => $img->id,
                    'imgLink' => $img->imgLink,
                ];
            }),
            'service_room' => $this->service_room->map(function ($serviceRoom) {
                return [
                    'id' => $serviceRoom->id,
                    'service' => [
                        'id' => $serviceRoom->service->id ?? null,
                        'name' => $serviceRoom->service->name ?? null,
                    ],
                ];
            }),
            'furniture_room' => $this->furniture_room->map(function ($furnitureRoom) {
                return [
                    'id' => $furnitureRoom->id,
                    'quantity' => $furnitureRoom->quantity,
                    'furniture' => [
                        'id' => $furnitureRoom->furniture->id ?? null,
                        'name' => $furnitureRoom->furniture->name ?? null,
                    ],
                ];
            }),
        ];
    }
}
