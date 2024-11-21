<?php

namespace App\Models\Permisstion;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Permisstion\ActionModel;
use App\Models\Permisstion\PermisstionModel;
class PermisstionDetailModel extends Model
{
    use HasFactory;
    protected $table = "tbl_permission_detail";
    protected $primary = 'id';
    protected $fillable = ['permissionId', 'acctionId','name','code','url', 'status','created_at', 'updated_at'];
    public function acction(){
        return $this->belongsTo(ActionModel::class, 'acctionId', 'id');
    }
    public function permission(){
        return $this->belongsTo(PermisstionModel::class, 'permissionId', 'id');
    }
}
