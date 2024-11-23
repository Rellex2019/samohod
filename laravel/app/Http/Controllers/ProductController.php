<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    public function store(ProductRequest $request)
    {
        $product = Product::factory()->create($request->all());

        return response()->json([
            'content' => [
                'id' => $product->id,
                'message' => 'Товар добавлен',
            ]
        ])->setStatusCode(201);
    }

    public function remove(Product $product)
    {
        $product->delete();
        return [
            'content' => [
                'message' => 'Товар удален',
            ]
        ];
    }

    public function update(Product $product, Request $request)
    {
        $product->update($request->all());

        return [
            'content' => [
                'id' => $product->id,
                'message' => 'Данные обновлены',
            ]
        ];
    }
}
