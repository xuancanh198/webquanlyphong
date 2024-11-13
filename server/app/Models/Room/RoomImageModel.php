<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomImageModel extends Model
{
    use HasFactory;
    protected $table = "tbl_room_img";
    protected $primary = 'id';
    protected $fillable = ['roomId', 'imgLink'];
    protected $hidden = ['roomId'];
     public $timestamps = false; 
}
