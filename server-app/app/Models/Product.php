<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    public function file()
    {
        return $this->morphMany(File::class, 'fileable');
    }
    public function type()
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }
}
