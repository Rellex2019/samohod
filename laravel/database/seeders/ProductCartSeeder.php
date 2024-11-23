<?php

namespace Database\Seeders;

use App\Models\ProductCart;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductCartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductCart::factory()->count(5)->create([
            'user_id'=>User::where('email', 'user@samohod.ru')->first()->id,

        ]);

        ProductCart::factory()->count(10)->create();
    }
}
