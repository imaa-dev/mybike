<?php

namespace App\Http\Services;


use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function getAll()
    {

    }

    public function createClient($request)
    {

        try {
            if($request->hasFile('file')){
                $path = $request->file('file')->store('client/'.$request->user()->id, 'public');
            }
            $client = new User;
            $client->role_id = 2;
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
                'message' => 'Client Created Successfully',
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
            $path = '';
            $client = User::where('id', $request->id)->with('file')->first();
            if($request->hasFile('file')){
                $path = $request->file('file')->store('client/'.$request->user()->id, 'public');
                Storage::disk('public')->delete($client->file->path);
            }
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            if($request->hasFile('file')){
                $client->file()->delete();
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
            Log::error("Service User Catch Error : ". $th);
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

    }

}
