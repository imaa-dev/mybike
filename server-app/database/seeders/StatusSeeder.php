<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            $DATA = [
                            [
                                'name' => 'RECEPCIONADO',
                            ],
                            [
                                'name' => 'DIAGNOSTICADO',
                            ],
                            [
                                'name' => 'APROVACION_REPUESTO',
                            ],
                            [
                                'name' => 'EN_REPARACION',
                            ],
                            [
                                'name' => 'REPARADO',
                            ],
                            [
                                 'name' => 'ENTREGADO',
                            ],
                            [
                                'name' => 'INCIDENCIA',
                            ],
                ];
                DB::table('status')->insert($DATA);
    }
}
