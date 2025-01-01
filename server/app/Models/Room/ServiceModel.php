<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
class ServiceModel extends Model
{
    use HasFactory, LogsActivity;
    protected $table = "tbl_service";
    protected $primary = 'id';
    protected $fillable = ['code', 'name','price', 'unit', 'quantity', 'created_at', 'updated_at'];
    protected static $logName = 'service';
    protected static $logOnlyDirty = true;
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName('adminAction')
            ->logOnly([
            'code',
            'name',
            'price',
            'unit',
            'quantity'
            ])
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {

        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới dịch vụ " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã được cập nhật  dịch vụ " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa dịch vụ " . $activity->subject->name,
            default => $activity->description,
        };
    }
}
