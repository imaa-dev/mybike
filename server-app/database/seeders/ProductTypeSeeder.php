<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $DATA = [
                    [
                        'name' => 'Motosierra',
                    ],
                    [
                        'name' => 'Cortadora de pasto',
                    ],
                    [
                        'name' => 'Desbrozadora',
                    ],
                    [
                        'name' => 'Generador',
                    ],
                    [
                        'name' => 'Podadora',
                    ],
        ];
        DB::table('product_types')->insert($DATA);
    }
}
