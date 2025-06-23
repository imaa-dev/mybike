<?php

namespace App\Http\Controllers;

use App\Http\Services\FileService;
use Illuminate\Http\Request;

class FileController extends Controller
{
    protected FileService $fileService ;
    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function removeImage($id)
    {
        $res = $this->fileService->removeImage($id);
        return response()->json($res);
    }

    public function uploadImage(Request $request)
    {
        $res = $this->fileService->addImage($request);
        return response()->json($res);
    }
}
