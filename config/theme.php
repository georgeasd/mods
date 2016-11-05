<?php

return  [
	'asset' => [
		'css' => 'assets/css',
		'js' => 'assets/js',
		'sass' => 'assets/sass',
	],
	'frontend' => [
		'active' => env('DEFAULT_FRONT_THEME','default_theme'),
	],
	'backend' => [
		'active' => env('DEFAULT_BACKEND_THEME','default_theme'),
	],
];