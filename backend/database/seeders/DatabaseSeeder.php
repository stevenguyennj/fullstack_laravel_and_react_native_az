<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('ad_locations')->insert([
                'name' => 'Location ' . $i,
                'latitude' => rand(-90, 90),
                'longitude' => rand(-180, 180),
            ]);
        }

        for ($i = 1; $i <= 10; $i++) {
            DB::table('ad_spends')->insert([
                'ad_location_id' => $i,
                'amount' => rand(100, 1000),
            ]);
        }

        for ($i = 1; $i <= 10; $i++) {
            DB::table('business_cryptos')->insert([
                'ad_location_id' => $i,
                'crypto_amount' => rand(500, 5000),
            ]);
        }
    }
}
