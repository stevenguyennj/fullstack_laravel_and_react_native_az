

Test laravel + react native
============
**Setup backend**
* cd backend

* copy .env.example to .env

* update db config in .env file

* install composer

* php artisan config:cache

* php artisan migrate:refresh --seed

* php artisan serve to run web . http://localhost:8000

  
**Setup react native**


* cd frontend

* copy .env.example to .env

* yarn install

* run : npm run start