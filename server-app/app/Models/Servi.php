<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servi extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function file()
    {
        return $this->morphMany(File::class, 'fileable');
    }
    public function reasons()
    {
        return $this->hasMany(Reason::class);
    }
    public function status()
    {
        return $this->belongsTo(Statu::class);
    }
}
