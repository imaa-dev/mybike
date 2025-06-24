<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function servis()
    {
        return $this->hasMany(Servi::class);
    }
}
