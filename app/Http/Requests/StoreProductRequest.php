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
        $productId = $this->route('id'); 

        return [
            'name' => ['required', 'string', 'max:100', 'unique:products,name,' . $productId],
            'description' => ['nullable', 'string'],
            'purchase_price' => ['required', 'numeric', 'min:0'], 
            'sale_price' => ['required', 'numeric', 'min:0'], 
            'is_excluded' => ['boolean'],
        ];
    }
    
    public function messages(): array
    {
        return [

            'name.required' => 'El nombre del producto es obligatorio.',
            'name.string' => 'El nombre del producto debe ser una cadena de texto.',
            'name.max' => 'El nombre del producto no puede tener más de 100 caracteres.', 
            'name.unique' => 'El nombre del producto ya está en uso.',


            'description.string' => 'La descripción debe ser una cadena de texto.',

            'purchase_price.required' => 'El precio de compra es obligatorio.',
            'purchase_price.numeric' => 'El precio de compra debe ser un número.',
            'purchase_price.min' => 'El precio de compra no puede ser menor a 0.', 

            'sale_price.required' => 'El precio de venta es obligatorio.',
            'sale_price.numeric' => 'El precio de venta debe ser un número.',
            'sale_price.min' => 'El precio de venta no puede ser menor a 0.',

            'is_excluded.boolean' => 'El campo de exclusión debe ser verdadero o falso.',
        ];
    }

}
