<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Services\ProductService;
use App\Models\Organization;
use App\Models\Product;
use App\Models\ProductType;
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
        $products = [];
        $organization = Organization::where('user_id', $request->user()->id)->first();
        $notOrganization = true;
        if($organization !== null){
            $notOrganization = false;
            $products = Product::where('organization_id',$organization->id)->get();
        }
        return Inertia::render('product/product', [
            'notOrganization' => $notOrganization,
            'products' => $products,
        ]);
    }

    public function create(){
        return Inertia::render('product/createProduct');
    }

    public function store(StoreProductRequest $request){
        $res = $this->productService->create($request);
        return response()->json($res);
    }
    public function getUpdate(Product $product)
    {
        $productFile = Product::where('id', $product->id)->first();
        return Inertia::render('product/editProduct', [
            'product' => $productFile
        ]);
    }
    public function update(StoreProductRequest $request)
    {
        $res = $this->productService->update($request);
        session()->flash('message', $res['message']);
        return redirect()->route('products.list.view');
    }
    public function delete($id){
        $res = $this->productService->delete($id);
        return response()->json($res);
    }
    public function get(Request $request){
        $res = $this->productService->getProducts();
        return response()->json($res);
    }
}
