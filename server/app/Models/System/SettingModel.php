<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Enums\ActiveLog;
use Illuminate\Database\Eloquent\Casts\Attribute;

class SettingModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_setting";
    protected $primary = 'id';
    protected static $logName = ActiveLog::ROLE_VALUE;
    protected static $logOnlyDirty = true;
    protected $fillable = [
        'key',
        'value',
        'note',
        'created_at',
        'updated_at',
    ];
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
            'created' => "Nhân viên " . Auth::user()->username . " đã  tạo mới cấu hình " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã  cập nhật cấu hình " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã  xóa cấu hình " . $activity->subject->name,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }
    public function properties(): Attribute
    {
        return Attribute::make(
            get: fn($value) => json_decode($value, true),
            set: fn($value) => json_encode($value, JSON_UNESCAPED_UNICODE)
        );
    }
}
