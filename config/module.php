<?php

return [

    'paths' => [
        realpath(__DIR__.'/../vendor/'),
        realpath(__DIR__.'/../app/code/'),
        realpath(__DIR__.'/../app/design/'),
    ],

	/*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'modules' => [
        'mod_theme' => true,
        'mod_view' => true,
        'mod_home' => true,
        'mod_scss' => true,
    ],
];