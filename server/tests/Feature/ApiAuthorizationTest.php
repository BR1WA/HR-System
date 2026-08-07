<?php

namespace Tests\Feature;

use App\Models\Demande;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class ApiAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
        Role::create(['name' => 'admin', 'guard_name' => 'web']);
        Role::create(['name' => 'employee', 'guard_name' => 'web']);
    }

    public function test_guests_cannot_access_hr_records_or_mutations(): void
    {
        $user = User::factory()->create();
        $demande = Demande::create([
            'user_id' => $user->id,
            'type' => 'demande_attestation_travail',
            'traitement' => 'en cours',
        ]);

        $this->getJson('/api/demandes')->assertUnauthorized();
        $this->getJson("/api/demandes/{$user->id}")->assertUnauthorized();
        $this->putJson("/api/demandes/{$demande->id}/status", ['status' => 'valider'])
            ->assertUnauthorized();
        $this->postJson("/api/archive/{$user->id}")->assertUnauthorized();
        $this->getJson("/api/generate-pdf/{$user->id}")->assertUnauthorized();
    }

    public function test_employees_can_only_read_their_own_profile_and_requests(): void
    {
        $employee = $this->employee();
        $otherEmployee = $this->employee();
        Sanctum::actingAs($employee, ['*']);

        $this->getJson("/api/users/{$employee->id}")->assertOk();
        $this->getJson("/api/users/{$otherEmployee->id}")->assertForbidden();
        $this->getJson("/api/demandes/{$employee->id}")->assertOk();
        $this->getJson("/api/demandes/{$otherEmployee->id}")->assertForbidden();
    }

    public function test_request_owner_is_taken_from_the_authenticated_user(): void
    {
        $employee = $this->employee();
        $otherEmployee = $this->employee();
        Sanctum::actingAs($employee, ['*']);

        $this->postJson('/api/demandes', [
            'user_id' => $otherEmployee->id,
            'type' => 'demande_attestation_travail',
        ])->assertCreated();

        $this->assertDatabaseHas('demandes', [
            'user_id' => $employee->id,
            'type' => 'demande_attestation_travail',
            'traitement' => 'en cours',
        ]);
        $this->assertDatabaseMissing('demandes', ['user_id' => $otherEmployee->id]);
    }

    public function test_employees_cannot_use_admin_endpoints(): void
    {
        $employee = $this->employee();
        $demande = Demande::create([
            'user_id' => $employee->id,
            'type' => 'demande_attestation_travail',
            'traitement' => 'en cours',
        ]);
        Sanctum::actingAs($employee, ['*']);

        $this->getJson('/api/users')->assertForbidden();
        $this->getJson('/api/demandes')->assertForbidden();
        $this->putJson("/api/demandes/{$demande->id}/status", ['status' => 'valider'])
            ->assertForbidden();
    }

    public function test_admins_can_manage_requests(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        $employee = $this->employee();
        $demande = Demande::create([
            'user_id' => $employee->id,
            'type' => 'demande_attestation_travail',
            'traitement' => 'en cours',
        ]);
        Sanctum::actingAs($admin, ['*']);

        $this->getJson('/api/demandes')->assertOk();
        $this->putJson("/api/demandes/{$demande->id}/status", ['status' => 'valider'])
            ->assertOk();
        $this->assertDatabaseHas('demandes', [
            'id' => $demande->id,
            'traitement' => 'valider',
        ]);
    }

    private function employee(): User
    {
        $employee = User::factory()->create();
        $employee->assignRole('employee');

        return $employee;
    }
}
