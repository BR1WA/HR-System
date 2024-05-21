<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin','guard_name' => 'web']);
        $adminPermissions = Permission::whereIn('name', [
            'test'
                ])->get();
        $adminRole->givePermissionTo($adminPermissions);

        $employeeRole = Role::create(['name' => 'employee','guard_name' => 'web']);
        $employeePermissions = Permission::whereIn('name', [
            'test2'
                ])->get();
        $employeeRole->givePermissionTo($employeePermissions);
    }
}
