<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            "nom" => "admin",
            "email" => "salaheddinezouitni00@gmail.com"
        ]);
        $admin->assignRole("admin");

        $employee = User::create([
            "nom" => "employee",
            "email" => "salaheddinezouitni@gmail.com"
        ]);
        $employee->assignRole("employee");
    }
}
