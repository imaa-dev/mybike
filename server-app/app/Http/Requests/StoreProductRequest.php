<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'brand' => ['required', 'string'],
            'model' => ['required', 'string'],
            'price' => ['nullable', 'numeric'],
            'file' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El campo nombre es obligatorio',
            'description.required' => 'El campo descripcion es obligatorio',
            'brand.required' => 'El campo marca es obligatorio',
            'model.required' => 'El campo modelo es obligatorio',
            'price.required' => 'El campo precio es obligatorio',
            'file.required' => 'El campo imagen es obligatorio',
        ];
    }
}
