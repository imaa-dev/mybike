<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{

    public function file()
    {
        return $this->morphOne(File::class, 'fileable');
    }
}
