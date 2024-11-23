<?php

namespace App\Policies;

use App\Models\ProductCart;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ProductCartPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function remove(User $user, ProductCart $productCart)
    {
        return $user->cart()->find($productCart)->count()
            ? Response::allow()
            : Response::deny('Запрещено',403);
    }

}
