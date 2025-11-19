<?php

namespace App\DAO;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserDAO
{
    public function create(array $data) : User
    {
        return User::create($data);
    }

    public function delete(int $id)
    {
        return User::destroy($id);
    }

    public function getByUserId(int $id) : Collection
    {
        return User::where('created_by_user_id', $id)->where('rol', 'CLIENT')->get();
    }

    public function updateClient($data) : User
    {
        $userClient = User::findOrFail($data['id']);
        $userClient->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone']
        ]);
        return $userClient;
    }

    public function getClientById($id) : User
    {
        return user::find($id);
    }
}
