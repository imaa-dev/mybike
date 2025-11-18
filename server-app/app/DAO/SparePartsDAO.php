<?php


namespace App\DAO;

use App\Models\SpareParts;

class SparePartsDAO
{
    public function createSparePart(array $data)
    {
        return SpareParts::create($data);
    }

    public function deleteSparePart(int $id)
    {
        return SpareParts::destroy($id);
    }

    public function getAll()
    {
        return SpareParts::getAll();
    }

}
