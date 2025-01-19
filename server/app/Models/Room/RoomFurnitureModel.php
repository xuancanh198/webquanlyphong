<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\FurnitureModel;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
class RoomFurnitureModel extends Model
{
    use HasFactory;
    protected $table = "tbl_furniture_room";
    protected $primary = 'id';
    protected $fillable = ['roomId', 'furnitureId','quantity'];
    protected $hidden = ['roomId', 'furnitureId'];
  
    public $timestamps = false; 
    public function furniture(){
        return $this->belongsTo(FurnitureModel::class, 'furnitureId');
    }
}
