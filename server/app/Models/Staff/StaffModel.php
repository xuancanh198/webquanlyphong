<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Staff\RoleModel;
use App\Models\Permisstion\PermisstionDetailModel;
use Illuminate\Database\Eloquent\Builder;

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
    public function permissions()
    {
        if (empty($this->role_detail)) {
            return [];
        }

        $permissions = json_decode($this->role_detail, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return [];
        }

        $activePermissions = array_filter($permissions, function ($value) {
            return $value === true;
        });
        $keys = array_keys($activePermissions);
        return PermisstionDetailModel::select('id', 'name', 'code')->whereIn('code', $keys)->get();
    }
    public function getPermissions(): array
    {
        if (empty($this->role_detail)) {
            return [];
        }

        $permissions = json_decode($this->role_detail, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return [];
        }

        $allPermissions = PermisstionDetailModel::pluck('code')->toArray();

        $result = [];
        foreach ($allPermissions as $permissionCode) {
            $result[$permissionCode] = isset($permissions[$permissionCode]) ? $permissions[$permissionCode] : false;
        }

        return $result;
    }


    public function hasPermission(string $code): bool
    {
        $permissions = $this->getPermissions(); 
        return isset($permissions[$code]) && $permissions[$code] === true;
    }
    public function scopeActive($query)
    {
        return $query->whereNull('ban_at');
    }
    public function scopeVerifyEmailActive($query){
        return $query->whereNotNull('verify_email_at');
    }
}
