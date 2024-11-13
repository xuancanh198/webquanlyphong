<?php

namespace App\Models\Room;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceModel extends Model
{
    use HasFactory;
    protected $table = "tbl_service";
    protected $primary = 'id';
    protected $fillable = ['code', 'name','price', 'unit', 'quantity', 'created_at', 'updated_at'];
}
