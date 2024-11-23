<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store()
    {
        $this->authorize('store', Order::class);

        $order = Auth::user()->ordering();

        return response()->json([
            'content' => [
                'order_id' => $order->id,
                'message' => 'Заказ оформлен',
            ]
        ])->setStatusCode(201);
    }

    public function index()
    {
       return new OrderCollection(Auth::user()->orders);
    }
}
