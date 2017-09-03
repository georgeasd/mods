<?php

return  [
	'asset' => [
        'scss',
        'css',
        'js',
        'img',
        'fonts'
    ],
    'compliers' => [
        'js' => [
            Mods\Theme\Compiler\Script\Minifier::class,
            Mods\Theme\Compiler\Script\Bundle::class,
            Mods\Theme\Compiler\Script\Move::class
        ],
        'css' => [
            Mods\Scss\Compiler\Scss::class,
            Mods\Theme\Compiler\Style\Minifier::class,
            Mods\Theme\Compiler\Style\Bundle::class,
            Mods\Theme\Compiler\Style\Move::class
        ],
        'img' => [
            Mods\Theme\Compiler\Img\Move::class
        ],
        'fonts' => [
            Mods\Theme\Compiler\Font\Move::class
        ],
    ],
	'frontend' => [
		'active' => env('DEFAULT_FRONT_THEME','default'),
	],
];