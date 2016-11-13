<?php

return  [
	'asset' => [
		'css',
		'js',
	],
	'compliers' => [
		'js' => [
			Mods\Theme\Compiler\Script\Minifier::class,
			Mods\Theme\Compiler\Script\Bundle::class,
			Mods\Theme\Compiler\Script\Move::class
		],
		'css' => [
			Mods\Theme\Compiler\Style\Minifier::class,
			Mods\Theme\Compiler\Style\Bundle::class,
			Mods\Theme\Compiler\Style\Move::class
		],
	],
	'frontend' => [
		'active' => env('DEFAULT_FRONT_THEME','default'),
	],
];