<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use  App\Models\User\BilModel;
use  App\Models\User\UserModel;
class TransactionModel extends Model
{
    use HasFactory;
    protected $table = "tbl_transaction";
    protected $primary = 'id';
    protected $fillable = ['billId', 'userId', 'totalMoney', 'status', 'created_at', 'updated_at'];
    protected $hidden = ['billId', 'userId'];
    public function bill(){
        return $this->belongsTo(BilModel::class, 'billId');
    }
    public function user(){
        return $this->belongsTo(UserModel::class, 'userId');
    }
}
