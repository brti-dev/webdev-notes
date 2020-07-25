# Laravel

    $ laravel new myproject

## Env

Set in .env and ./config/app.php

Retreive: `env('APP_NAME')` or `$_ENV['APP_ENV']`

## Pushing to production environment

Cache config files

    $ php artisan config:cache