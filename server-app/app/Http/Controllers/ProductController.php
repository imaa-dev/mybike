<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Services\ProductService;
use App\Models\Product;
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

    public function list(Request $request){
        $products = Product::where('user_id', $request->user()->id)->with('file')->get();
        return Inertia::render('product', [
            'products' => $products,
        ]);
    }

    public function create(){
        return Inertia::render('forms/createProductForm');
    }

    public function store(StoreProductRequest $request){
        $res = $this->productService->create($request);
        session()->flash('message', $res['message']);
        return redirect()->route('products.list');
    }
    public function getUpdate(Product $product)
    {
        $productFile = Product::where('id', $product->id)->with('file')->first();
        return Inertia::render('forms/editProductForm', [
            'product' => $productFile
        ]);
    }
    public function update(Request $request)
    {
        $res = $this->productService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('products.list');
    }
    public function delete(Request $request){
        return true;
    }
}
