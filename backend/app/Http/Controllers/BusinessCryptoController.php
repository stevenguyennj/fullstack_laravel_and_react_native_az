<?php

namespace App\Http\Controllers;

use App\Models\BusinessCrypto;
use Illuminate\Http\Request;

class BusinessCryptoController extends Controller
{
    public function index()
    {
        $businessCryptos = BusinessCrypto::all();
        return response()->json($businessCryptos);
    }

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'ad_location_id' => 'required|integer',
            'crypto_amount' => 'required|numeric',
        ]);

        // Create new BusinessCrypto instance
        $businessCrypto = BusinessCrypto::create($validatedData);

        return response()->json($businessCrypto, 201);
    }
}
