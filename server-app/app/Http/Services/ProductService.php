<?php
namespace App\Http\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductService{

    public function create($request){
        $product_paths = [];
        try {
            foreach($request->file('file') as $file){
                $path =  $file->store('product/'.$request->user()->id, 'public');
                $product_paths[] = $path;
            }
            $product = new Product();
            $product->user_id  = $request->user()->id;
            $product->name =  $request->name;
            $product->description  = $request->description;
            $product->brand  = $request->brand;
            $product->model  = $request->model;
            $product->price = $request->price;
            $product->save();
            foreach ($product_paths as $path){
                $product->file()->create([
                    'path' => $path
                ]);
            }
            $data = ['status'=>'success','message'=>'Producto Creado Correctamente'];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => $th,
                'code' => 500,
            ];
        }
        return $data;
    }

    public function update($request){
        try {
            foreach($request->file('file') as $file){
                $path =  $file->store('product/'.$request->user()->id, 'public');
                $product_paths[] = $path;
            }
            $productUpdate = Product::where('id', $request->id)->with('file')->first();
            $productUpdate->name =  $request->name;
            $productUpdate->description =  $request->description;
            $productUpdate->brand =  $request->brand;
            $productUpdate->model =  $request->model;
            $productUpdate->price = $request->price;
            foreach ($productUpdate->file as $file){
                Storage::disk('public')->delete($file->path);
            }
            $productUpdate->save();
            $productUpdate->file()->delete();
            foreach ($product_paths as $path){
                $productUpdate->file()->create([
                    'path' => $path
                ]);
            }
            $data = [
                'code' => 200,
                'status' =>  'success',
                'message' =>  'Producto Actualizado Correctamente'
            ];
        } catch (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => 'Error al eliminar producto',
                'code' => 500,
                'message' => $th->getMessage()
            ];
        }

        return $data;
    }

    public function delete($request){
        try {
            $productDelete = Product::where('id', $request->id)->with('file')->first();
            foreach ($productDelete->file as $file){
                Storage::disk('public')->delete($file->path);
            }
            $productDelete->delete();
            $productDelete->file()->delete();
            $data = [
                'code' => 200,
                'status' =>  'success',
                'message' =>  'Producto eliminado Correctamente'
            ];
        } catch  (\Throwable $th) {
            Log::error($th);
            $data = [
                'error' => 'Error al eliminar producto',
                'code' => 500,
            ];
        }
        return $data;
    }
}
