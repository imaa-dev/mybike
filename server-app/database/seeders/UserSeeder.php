<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $DATA = [
            [
                'name' => 'Mauricio',
                'email' => 'imaa.desarrollo@gmail.com',
                'email_verified_at' => now(),
                'phone' => '+56982198976',
                'password' => Hash::make('qwerty123'),
            ],
            [
                'name' => 'Alejandro',
                'email' => 'alejandro@gmail.com',
                'email_verified_at' => now(),
                'phone' => '+56999887766',
                'password' => Hash::make('qwerty123'),
            ],
            [
                'name' => 'Mauri',
                'email' => 'mauri@gmail.com',
                'email_verified_at' => now(),
                'phone' => '+56977668899',
                'password' => Hash::make('qwerty123'),
            ],
        ];
        DB::table('users')->insert($DATA);
    }
}
