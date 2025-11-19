<?php

namespace App\DAO;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;

class OrganizationDAO
{
    public function createOrganization(array $data) : Organization
    {
        return Organization::create($data);
    }

    public function deleteOrganization(int $id)
    {
        return Organization::destroy($id);
    }

    public function getById(int $id) : Organization
    {
        return Organization::find($id);
    }

    public function getByUserId(int $userId) : Collection
    {
        return Organization::where('user_id', $userId)->with('file')->get();
    }

    public function getActive(int $userId): ?Organization
    {
        return Organization::where('user_id', $userId)->where('active', true)->with('file')->first();
    }

    /**
     * Actualiza una organización existente.
     *
     * @param  array  $data  Datos que deben incluir al menos ['id' => int, ...campos a actualizar...]
     * @return Organization|null
     *
     */
    public function updateOrganization(array $data): ?Organization
    {
        $organization = Organization::findOrFail($data['id']);
        $organization->update([
            array_intersect_key($data, array_flip($organization->getFillable()))
        ]);
        return $organization;
    }
}
