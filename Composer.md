# Composer

## Installation

Install PHP and Composer http://kizu514.com/blog/install-php7-and-composer-on-windows-10/
    `$ php -v //check PHP installation`
    `$ composer -v //check Composer installation`
Install packages:
- Individually
    `$ composer require --dev phpunit/phpunit`
- Via `composer.json`
    `$ composer i` 
- Guided installation
    `$ composer init`
Make changes to autoload on `composer.json`
    `$ composer dump-autoload`

## Optimization for Production

- Set `"optimize-autoloader": true` inside the config key of composer.json
- Call `install` or `update` with -o / --optimize-autoloader
- Call `dump-autoload` with -o / --optimize

Optimizes performance over convenience; Don't use in development, only production. https://getcomposer.org/doc/articles/autoloader-optimization.md

## Packages and Extensions

See PHP.md