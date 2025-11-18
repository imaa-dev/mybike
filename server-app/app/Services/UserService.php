<?php

namespace App\Services;


use App\DAO\UserDAO;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserService
{
    private UserDAO $userDAO;

    public function __construct(UserDAO $userDAO)
    {
        $this->userDAO = $userDAO;
    }

    public function createClient($data)
    {
        try {
            $client = $this->userDAO->create($data);

            $data = [
                'success' => true,
                'code' => 201,
                'message' => 'Cliente Creado Exitosamente',
                'client' => $client
            ];
        } catch (\Throwable $th) {
            Log::error("Service User Catch Error : ". $th);
            $data = [
                'success' => false,
                'code' => 400,
                'message' => 'ERROR',
                'clients' => null
            ];
        }
        return $data;
    }

    public function update($data)
    {
        try {
            $this->userDAO->updateClient($data);
            $data = [
                'success' => true,
                'code' => 200,
                'message' => 'Cliente Actualizado Correctamente'
            ];
        } catch (\Throwable $th) {
            Log::error("Service User Catch Error : ". $th);
            $data = [
                'success' => false,
                'code' => 500,
                'message' => 'Error'
            ];
        }
        return $data;
    }

    public function deleteClient($id)
    {
        try {
            $this->userDAO->delete($id);
            $data = [
                'success' => true,
                'code' => 204,
                'message' => 'Cliente eliminado Correctamente'
            ];
        } catch (\Throwable $th) {
            Log::error("Service User Catch Error : ". $th);
            $data = [
                'success' => false,
                'code' => 500,
                'message' => 'Error al eliminar registro'
            ];
        }
        return $data;
    }

    public function listClients($id)
    {
        return $this->userDAO->getByUserId($id);
    }

    public function getClientById($id)
    {
        return $this->userDAO->getClientById($id);
    }
}
