<?php
namespace App\Http\Services;

use App\Models\Client;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ClientService {

    public function create($request)
    {
        try {

            $client = new Client;
            $client->user_id = $request->user()->id;
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Cliente Creado Satisfactoriamente',
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

    public function getAll()
    {
        return true;
    }

    public function update($request)
    {
        try {
            $client = Client::where('id', $request->id)->first();
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
            Log::error("Service Client Catch Error : ". $th);
            $data = [
                'success' => false,
                'code' => 500,
                'message' => 'Error'
            ];
        }
        return $data;
    }

    public function delete($request)
    {
        try {
            $client = Client::where('id', $request->id)->first();
            if ($client->servis()->count() > 0) {
                return [
                    'success' => false,
                    'code' => 400,
                    'message' => 'Este cliente tiene servicios asociados y no puede ser eliminado.'
                ];
            }
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
