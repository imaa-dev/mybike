<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'Free',
            'price' => 0,
            'interval' => 'monthly',
            'duration_days' => 30,
            'features' => 'Acceso básico a funciones del taller y tienda.',
        ]);

        Plan::create([
            'name' => 'Premium',
            'price' => 10.000,
            'interval' => 'monthly',
            'duration_days' => 30,
            'features' => 'Acceso completo, chat entre clientes, soporte técnico y más.',
        ]);
    }
}
