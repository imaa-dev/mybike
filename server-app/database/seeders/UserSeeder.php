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
                'role_id'  => 1,
                'name' => 'Mauricio',
                'email' => 'imaa.desarrollo@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('qwerty123'),
            ],
            [
                'role_id'  => 2,
                'name' => 'Alejandro',
                'email' => 'alejandro@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('qwerty123'),
            ],
            [
                'role_id'  => 3,
                'name' => 'Mauri',
                'email' => 'mauri@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('qwerty123'),
            ],
        ];
        DB::table('users')->insert($DATA);
    }
}
