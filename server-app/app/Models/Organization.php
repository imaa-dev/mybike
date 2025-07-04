<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
    public function servis()
    {
        return $this->hasMany(Servi::class);
    }
}
