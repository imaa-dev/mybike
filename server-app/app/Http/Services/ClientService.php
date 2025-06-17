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
            if($request->hasFile('file')){
                $path = $request->file('file')->store('client/'.$request->user()->id, 'public');
            }
            $client = new Client;
            $client->user_id = $request->user()->id;
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            if($request->hasFile('file')){
                $client->file()->create([
                    'path' => $path
                ]);
            }
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
            $path = '';
            $client = Client::where('id', $request->id)->with('file')->first();
            if($request->hasFile('file') && $client->file){
                $path = $request->file('file')->store('client/'.$request->user()->id, 'public');
                Storage::disk('public')->delete($client->file->path);
            }
            if($request->hasFile('file') && !$client->file){
                $path = $request->file('file')->store('client/'.$request->user()->id, 'public');
            }

            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            if($request->hasFile('file') && $client->file){
                $client->file()->delete();
                $client->file()->create([
                    'path' => $path
                ]);
            }
            if($request->hasFile('file') && !$client->file){
                $client->file()->create([
                    'path' => $path
                ]);
            }
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
            $client = Client::where('id', $request->id)->with('file')->first();
            if($client->file){
                Storage::disk('public')->delete($client->file->path);
            }
            $client->delete();
            if($client->file){
                $client->file()->delete();
            }
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
