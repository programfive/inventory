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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique(); 
            $table->string('address', 255)->nullable(); 
            $table->string('phone', 20)->nullable(); 
            $table->string('email', 100)->nullable()->unique();
            $table->string('contact_person', 100)->nullable(); 
            $table->string('nit', 50)->nullable()->unique();
            $table->text('notes')->nullable(); 
            $table->boolean('is_active')->default(true); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
