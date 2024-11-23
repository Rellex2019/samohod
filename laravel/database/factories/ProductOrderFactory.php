<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductOrder;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductOrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductOrder::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => Product::all()->random(),
            'order_id' => Order::all()->random(),
            'price' => 0,
            'quantity' => 1
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (ProductOrder $productOrder) {
            //$productOrder->price = Product::find($productOrder->product_id)->price;
            $productOrder->price = $productOrder->product->price;
            $productOrder->save();
        });
    }


}
