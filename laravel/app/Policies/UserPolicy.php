<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserPolicy
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

    public function isUser(User $user)
    {
        return $user->role->code === 'user'
            ? Response::allow()
            : Response::deny('Доступ для вашей группы запрещен',403);
    }

    public function isAdmin(User $user)
    {
        return $user->role->code === 'admin'
            ? Response::allow()
            : Response::deny('Доступ для вашей группы запрещен',403);
    }
}
