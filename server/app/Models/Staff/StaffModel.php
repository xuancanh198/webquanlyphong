<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Staff\RoleModel;
class StaffModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "tbl_staff_admin";
    protected $primary = 'id';
    protected $fillable = [
        'role_id',
        'username',
        'password',
        'phoneNumber',
        'email',
        'password_default',
        'fullname',
        'address',
        'note',
        'img',
        'status',
        'role_detail',
        'ban_at',
        'ban_expiration_at',
        'verify_email_at',
        'created_at',
        'updated_at',
    ];
    public function role(){
        return  $this->belongsTo(RoleModel::class, 'role_id');
    }
}
