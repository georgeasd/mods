'use strict';
var gutil = require('gulp-util');
var _ = require('lodash');
module.exports = function() {
	var config = this.opts.config;
	var fs = require('fs'),
	  path = require('path'),
	  gulp = this.gulp,
	  assetpath = path.join(config.resourcePath, 'assets/config.json'),
	  assetConfig = {},
	  stats;

	try {
	  stats = fs.statSync(assetpath);
	  assetConfig = require(assetpath);
	} catch (e) {
	  gutil.log(gutil.colors.red("File does not exist.",assetpath));
	  gutil.log(gutil.colors.red("run theme:deploy to generate the file"));
  	  process.exit(-1);
	}

	_.forOwn(assetConfig.assets, function(path, key)  {
		switch(key) {
			case 'css':
				require('../../plugin/css')(gulp, assetConfig, path);
				break;
			case 'js':
				require('../../plugin/script')(gulp, assetConfig, path);
				break;
			case 'sass':
				require('../../plugin/sass')(gulp, assetConfig, path);
				break;
			case 'less':
				require('../../plugin/less')(gulp, assetConfig, path);
				break;		
		}
	});
};
