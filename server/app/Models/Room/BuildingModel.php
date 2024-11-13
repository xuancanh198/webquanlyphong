<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuildingModel extends Model
{
    use HasFactory;
    protected $table = "tbl_building_manager";
    protected $primary = 'id';
    protected $fillable = ['code', 'name','image' ,'numberFloor' ,'numbeRoomsRent', 'address','long', 'lat', 'note', 'created_at', 'updated_at'];
}
