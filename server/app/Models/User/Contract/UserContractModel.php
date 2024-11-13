<?php

namespace App\Models\User\Contract;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User\UserModel;
class UserContractModel extends Model
{
    use HasFactory;
    
    protected $table = "tbl_contract_user";
    protected $primary = 'id';
    protected $fillable = ['contractId', 'userId'];
    protected $hidden = ['contractId', 'userId'];
     public $timestamps = false; 
     public function user(){
        return $this->belongsTo(UserModel::class, 'userId');
    }
}
