<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servi extends Model
{

    public function file()
    {
        return $this->morphMany(File::class, 'fileable');
    }
}
