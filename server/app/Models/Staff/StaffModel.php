<?php

namespace App\Models\Staff;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Staff\RoleModel;
use App\Models\Permisstion\PermisstionDetailModel;
use App\Models\Room\BuildingModel;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use App\Enums\ActiveLog;
use App\Enums\StaffsEnum;
class StaffModel extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, LogsActivity;

    protected $table = "tbl_user";
    protected $primary = 'id';
    protected $fillable = ['username', 'password', 'fullname', 'defaultPassword', 'email', 'dateOfBirth', 'phoneNumber', 'address', 'dateIssuanceCard', 'placeIssue', 'identificationCard', 'imgLink', 'isVerifiedInfor', 'status', 'note', 'created_at', 'updated_at'];    protected $hidden = ['role_id', 'password'];

    protected static $logName = ActiveLog::STAFF_VALUE;
    protected static $logOnlyDirty = true;

    public function role()
    {
        return $this->belongsTo(RoleModel::class, 'role_id');
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

    public function building()
    {
        return $this->belongsTo(BuildingModel::class, 'buildingId');
    }

    public function scopeBuilding($query)
    {
        return $query->where('buildingId', Auth::user()->buildingId);
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
    public function scopeGetInBuilding($query){
        if(Auth::user()->buildingId !== StaffsEnum::SUPPER_ROLE_DEFAULt){
            return $query->where('buildingId', Auth::user()->buildingId);
        }
        return $query;
    }
    public function scopeVerifyEmailActive($query)
    {
        return $query->whereNotNull('verify_email_at');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLog::TYPE_LOG_ADMIN)
            ->logOnly([
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
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {
        $mess = "";
        if ($eventName === 'updated' && isset($activity->causer_id)) {
            if (Auth::user()->id === $activity->subject->id) {
                $mess = "Nhân viên : " . Auth::user()->username . " đã cập nhật thông tin của chính mình";
            } else {
                $mess = "Nhân viên : " . Auth::user()->username . " đã cập nhật thông tin của tài khoản nhân viên : " . $activity->subject->username;
            }
        }


        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới tài khoản nhân viên " . $activity->subject->username,
            'updated' => $mess,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa tài khoản nhân viên " . $activity->subject->username,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }

}
