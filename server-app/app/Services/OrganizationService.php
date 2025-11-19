<?php

namespace App\Services;

use App\DAO\OrganizationDAO;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class OrganizationService
{

    private OrganizationDAO $organizationDAO;
    public function __construct(OrganizationDAO $organizationDAO){
        $this->organizationDAO = $organizationDAO;
    }

    public function getAllByUser(int $id) : Collection
    {
        return $this->organizationDAO->getByUserId($id);
    }

    public function getActive(int $id)
    {
        return $this->organizationDAO->getActive($id);
    }

    public function create(array $data)
    {
        try {
            if($data['file']){
                $path = $data['file']->store('organization/'.$data['user_id'], 'public');
            }
            $organization = $this->organizationDAO->createOrganization($data);
            if($data['file']){
                $organization->file()->create([
                    'path' => $path
                ]);
            }
            $data = [
                'code' => 201,
                'message' => 'Organization creada satisfactoriamente',
                'success' => true,
                'organization' => $organization
            ];
        } catch (\Exception $exception){
            Log::error($exception->getMessage());
            $data = [
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
                'success' => false,
                'organization' => null
            ];
        }
        return $data;
    }

    public function update(array $data, $file)
    {
        try{
            $organizationUpdate = Organization::where('id', $data['id'])->with('file')->first();
            if($file){
                $path = $file->store('organization/'.$data['user_id'], 'public');
                if($organizationUpdate->file){
                    $organizationUpdate->file()->delete();
                }
                if($organizationUpdate->file){
                    Storage::disk('public')->delete($organizationUpdate->file->path);
                }
            }

            $organization = $this->organizationDAO->updateOrganization($data);
            if($file){
               $organization->file()->create([
                    'path' => $path
                ]);
            }
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organizacion actualizada Satisfactoriamente',
                'organization' => $organization
            ];
        } catch(\Exception $e){
            Log::error($e->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => $e->getMessage(),
                'organization' => null
            ];
        }
        return $data;
    }

    public function delete(int $id)
    {
        try {
            $organizationDelete = Organization::where('id', $id)->with('file')->first();
            if($organizationDelete->servis()->exists() ){
                return [
                    'success' => false,
                    'code' => 400,
                    'message' => 'La organizacion tiene servicios asociados, no se puede eliminar'
                ];
            }
            $this->organizationDAO->deleteOrganization($id);
            if($organizationDelete->file){
                $organizationDelete->file()->delete();
            }
            if($organizationDelete->file){
                Storage::disk('public')->delete($organizationDelete->file->path);
            }
            $data = [
                'code' => 200,
                'success' => true,
                'message' => 'Organizacion eliminada Satisfactoriamente',
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => 'ERROR'
            ];
        }
        return $data;
    }

    public function getByUserId(int $userId) 
    {
        try {
            $organizationByUserId = $this->organizationDAO->getByUserId($userId);
            $data = [
                'code' => 201,
                'status' => true,
                'message' => 'Registro obtenido satisfactoriamente',
                'organizations' => $organizationByUserId
            ];
        } catch (\Throwable $th){
            Log::error($th->getMessage());
            $data = [
                'code' => 500,
                'status' => 'error',
                'message' => 'ERROR'
            ];
        }

        return $data;
    }
}
