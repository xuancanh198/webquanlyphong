<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
class UserModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "tbl_user";
    protected $primary = 'id';
    protected $fillable = ['username', 'password', 'fullname', 'defaultPassword', 'email', 'dateOfBirth', 'phoneNumber', 'address','dateIssuanceCard','placeIssue','identificationCard','imgLink','isVerifiedInfor','status','note','created_at','updated_at'];
}
