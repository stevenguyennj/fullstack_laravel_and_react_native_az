<?php

namespace App\Http\Controllers;

use App\Models\AdSpend;
use Illuminate\Http\Request;

class AdSpendController extends Controller
{
    public function index()
    {
        $adSpends = AdSpend::all();
        return response()->json($adSpends);
    }

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'ad_location_id' => 'required|integer',
            'amount' => 'required|numeric',
        ]);

        // Create new AdSpend instance
        $adSpend = AdSpend::create($validatedData);

        return response()->json($adSpend, 201);
    }
}
