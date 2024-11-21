<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermisstionDetailResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'code' => $this->code,
            'permission' => [
                'id' => $this->permission->id,
                'code' => $this->permission->code,
                'name' => $this->permission->name
            ],
            'acction' => [
                'id' => $this->acction->id,
                'code' => $this->acction->code,
                'name' => $this->acction->name
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
