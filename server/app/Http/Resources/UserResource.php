<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'defaultPassword' =>$this->defaultPassword,
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
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
