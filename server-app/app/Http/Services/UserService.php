<?php

namespace App\Http\Services;


use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserService
{
    public function getAll()
    {

    }

    public function createClient($request)
    {
        try {
            $client = new User;
            $client->role_id = 2;
            $client->name = $request->name;
            $client->email = $request->email;
            $client->phone = $request->phone;
            $client->save();
            $data = [
                'status' => 'success',
                'code' => 200,
                'message' => 'Client Created Successfully',
            ];
        } catch (\Throwable $th) {
            Log::error("Service User Catch Error : ". $th);
            $data = [
                'success' => false,
                'error' => 'Error'
            ];
        }
        return $data;
    }

    public function update($request)
    {

    }

    public function delete($request)
    {

    }

}
