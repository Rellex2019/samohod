<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where($request->all())->first();
        if (!$user) {
            throw new ApiException(401, 'Неудачный вход');
        }
        Auth::login($user);
        return [
            'content' => [
                'user_token' => Auth::user()->generateToken()
            ]
        ];
    }

    public function logout()
    {
        Auth()->user()->clearToken();

        return [
            'content' => [
                'message' => 'Выход',
            ],
        ];
    }

    public function signup(SignupRequest $request)
    {
        $user = User::make($request->all())
            ->setRole('user');

        $user->save();


        return response()->json([
            'content' => [
                'user_token' => $user->generateToken()
            ]
        ])->setStatusCode(201);
    }
}
