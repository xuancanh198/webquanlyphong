<?php

namespace App\Models\Staff;

use App\Models\Permisstion\PermisstionDetailModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Staff\StaffModel;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Enums\ActiveLog;
class RoleModel extends Model
{
    use HasFactory, LogsActivity;

    protected $table = "tbl_role";
    protected $primary = 'id';
    protected $fillable = ['name', 'role_detail', 'created_at', 'updated_at'];
    protected static $logName = ActiveLog::ROLE_VALUE;
    protected static $logOnlyDirty = true;

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

    public function staffs()
    {
        return $this->hasMany(StaffModel::class, 'role_id', 'id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLog::TYPE_LOG_ADMIN)
            ->logOnly([
            'name',
            'role_detail',
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {
        
        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới  chức vụ " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã được cập nhật  chức vụ " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa  chức vụ " . $activity->subject->name,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }

}
