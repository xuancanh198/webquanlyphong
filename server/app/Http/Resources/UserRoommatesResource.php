<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRoommatesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'username' => $this->username,
            'fullname' => $this->fullname,
            'email' => $this->email,
            'dateOfBirth' => $this->dateOfBirth,
            'phoneNumber' => $this->phoneNumber,
            'address' => $this->address,
            'dateIssuanceCard' => $this->dateIssuanceCard,
            'placeIssue' => $this->placeIssue,
            'identificationCard' => $this->identificationCard,
            'imgLink' => $this->imgLink,
            'isVerifiedInfor' => $this->isVerifiedInfor,
            'status' => $this->status,
        ];
    }
}
