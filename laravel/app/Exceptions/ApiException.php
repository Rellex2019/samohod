<?php

namespace App\Exceptions;

use Illuminate\Http\Exceptions\HttpResponseException;

class ApiException extends HttpResponseException
{
    public function __construct($code = 422, $message = 'Несоответствие требованиям', $errors = [])
    {
        $data = [
            'warning' => [
                'code' => $code,
                'message' => $message,
            ]
        ];
        if (count($errors) > 0) {
            $data['warning']['warnings'] = $errors;
        }

        parent::__construct(response()->json($data)->setStatusCode($code));
    }

}
