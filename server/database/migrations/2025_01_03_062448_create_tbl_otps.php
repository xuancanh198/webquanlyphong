<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_otps', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('userId')->nullable();
            $table->integer('staffId')->nullable();
            $table->string('typeAuth');
            $table->string('phoneNumber')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_otps');
    }
};
