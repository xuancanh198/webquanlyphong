<?php

namespace App\Models\Staff;
use App\Models\Permisstion\PermisstionDetailModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Staff\StaffModel;
class RoleModel extends Model
{
    use HasFactory;
    protected $table = "tbl_role";
    protected $primary = 'id';
    protected $fillable = ['name', 'role_detail','created_at', 'updated_at'];
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
        return PermisstionDetailModel::select('id','name','code')->whereIn('code', $keys)->get();
    }
    public function staffs(){
        return $this->hasMany(StaffModel::class, 'role_id', 'id');
    }
}
