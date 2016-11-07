<?php

return [
    'mod_home' => [
        'name' => 'Home',
        'type' => 'module',
        'providers' => [
            Mods\Home\HomeServiceProvider::class,
            Mods\Home\RouteServiceProvider::class,
        ],
        'aliases' => [
        ],
        'depends' => [
        ],
        'autoload' => [
            'psr-4' => [
                'Mods\\Home\\' => realpath(__DIR__.'/src/')
            ]
        ]
    ]
];
