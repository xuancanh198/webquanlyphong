<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Room\ServiceModel;
class RoomServiceModel extends Model
{
    use HasFactory;
    protected $table = "tbl_service_room";
    protected $primary = 'id';
    protected $fillable = ['roomId', 'serviceId'];
    protected $hidden = ['roomId','serviceId'];
    public $timestamps = false; 
    public function service(){
        return $this->belongsTo(ServiceModel::class, 'serviceId');
    }
}
