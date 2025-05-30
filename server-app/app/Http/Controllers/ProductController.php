<?php

namespace App\Http\Controllers;

use App\Http\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function list(){
        return Inertia::render('product');
    }

    public function create(){
        return Inertia::render('forms/createProductForm');
    }

    public function store(Request $request){
        $res = $this->productService->create($request);
        dd($res);
    }

    public function update(Request $request){
        return true;
    }
    public function delete(Request $request){
        return true;
    }
}
