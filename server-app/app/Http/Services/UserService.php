<?php

namespace App\Http\Services;


use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserService
{

    public function createClient($request)
    {
        try {
            $client = new User;
            $client->rol = "CLIENT";
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Cliente Creado Exitosamente',
                'client' => $client
            ];
        } catch (\Throwable $th) {
            Log::error("Service User Catch Error : ". $th);
            $data = [
                'success' => false,
                'error' => 'Error',
                'message' => 'ERROR'
            ];
        }
        return $data;
    }

    public function update($request)
    {
        try {
            $client = User::where('id', $request->id)->first();
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
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

    public function deleteClient($request)
    {
        try {
            $client = User::where('id', $request->id)->first();
            $client->delete();
            $data = [
                'success' => true,
                'code' => 200,
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
}
