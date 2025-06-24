<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'product_id' => 'required|integer',
            'client_id' => 'required|integer',
            'organization_id' => 'required|integer',
            'date_entry' => 'required|string',
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'El producto es requerido',
            'organization_id.required' => 'La Organizacion es requerida',
            'client_id.required' => 'El cliente es requerido',
            'date_entry.required' => 'La fecha ingreso es requerida',
            'date_entry.string' => 'La fecha debe ser una cadena de texto',
        ];
    }
}
