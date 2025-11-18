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
        $userClient = User::find($data['id']);
        $fillable = $userClient->getFillable();
        $updateData = array_intersect($data, array_flip($fillable));
        $userClient->update($updateData);
        return $userClient;
    }

    public function getClientById($id) : User
    {
        return user::find($id);
    }
}
