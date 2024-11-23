<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCartResource;
use App\Models\Product;
use App\Models\ProductCart;
use Illuminate\Http\Request;

class ProductCartController extends Controller
{
    public function addProduct(Product $product)
    {
        $list = ProductCart::where('user_id', Auth()->id())->where('product_id', $product->id)->first();
        if($list){
            $response = ProductCart::where('user_id', Auth()->id())->where('product_id', $product->id)->first();
            $response->update(['quantity'=>$response->quantity+1]);
            return response()->json([
                'content' => [
                    'message' => 'Товар в корзине',
                ]
            ])->setStatusCode(201);
        }
        else{
            ProductCart::create([
                'user_id' => Auth()->id(),
                'product_id' => $product->id,
    
            ]);
            return response()->json([
                'content' => [
                    'message' => 'Товар в корзине',
                ]
            ])->setStatusCode(201);
        }
    }

    public function show()
    {
        return ProductCartResource::collection(Auth()->user()->cart);
    }

    public function changeQuantity(Request $request)
    {
        ProductCart::find($request->id)->update(['quantity'=>$request->quantity]);
        return response(
            ['id'=> $request->id,
            'quan'=> $request->quantity]
        );
    }

    public function remove(ProductCart $productCart)
    {
        $this->authorize('remove', $productCart);

        $productCart->delete();
        return [
            'content' => [
                'message' => 'Позиция удалена из корзины',
            ]
        ];
    }
}
