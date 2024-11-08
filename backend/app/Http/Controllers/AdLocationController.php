<?php

namespace App\Http\Controllers;

use App\Models\AdLocation;
use Illuminate\Http\Request;

class AdLocationController extends Controller
{
    public function index()
    {
        return AdLocation::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        return AdLocation::create($request->all());
    }

    public function show(AdLocation $adLocation)
    {
        return $adLocation;
    }

    public function update(Request $request, AdLocation $adLocation)
    {
        $request->validate([
            'name' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $adLocation->update($request->all());

        return $adLocation;
    }

    public function destroy(AdLocation $adLocation)
    {
        $adLocation->delete();

        return response()->noContent();
    }
}

