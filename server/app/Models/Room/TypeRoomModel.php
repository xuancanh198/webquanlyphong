<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeRoomModel extends Model
{
    use HasFactory;
    protected $table = "tbl_type_room";
    protected $primary = 'id';
    protected $fillable = ['code', 'name', 'created_at', 'updated_at'];
}
