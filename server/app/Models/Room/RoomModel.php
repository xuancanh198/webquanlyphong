<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\RoomFurnitureModel;
use App\Models\Room\RoomServiceModel;
use App\Models\Room\RoomImageModel;
use App\Models\Room\BuildingModel;
use App\Models\Room\TypeRoomModel;
use App\Models\Room\FloorModel;
class RoomModel extends Model
{
    use HasFactory;
    protected $table = "tbl_room";
    protected $primary = 'id';
    protected $fillable = ['typeRoomId', 'floorId','buildingId', 'length', 'width', 'height','acreage','status','price','name','code','note','created_at', 'updated_at'];
    protected $hidden = ['typeRoomId', 'floorId','buildingId'];
    public function img(){
        return $this->hasMany(RoomImageModel::class,'roomId','id');
    }
    public function service_room(){
        return $this->hasMany(RoomServiceModel::class,'roomId','id');
    }
    public function furniture_room(){
        return $this->hasMany(RoomFurnitureModel::class,'roomId','id');
    }
    public function building(){
        return $this->belongsTo(BuildingModel::class,'buildingId');
    }
    public function floor(){
        return $this->belongsTo(FloorModel::class,'floorId');
    }
    public function type_room(){
        return $this->belongsTo(TypeRoomModel::class,'typeRoomId');
    }
}
