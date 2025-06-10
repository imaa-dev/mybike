<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servi extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function file()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
