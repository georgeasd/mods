var path = require('path'),
	fs = require('fs'),
	Promise = require('bluebird'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	_ = require('lodash');
	config = require('../config'),
	assetpath = config.build.assetConfigPath;

function readAssetConfig(assetpath){
	try {
	  fs.statSync(assetpath)
	  return require(assetpath)
	} catch (e) {
	  console.log("File does not exist.",assetpath)
	  console.log("run theme:compile to generate the file")
	  process.exit(-1);
	}
}

function createWebpackComplier(options, callback) {
	return webpack(options, callback)
}

function genertareWebpackConfig(area, theme, asset, configs) {
	var baseWebpackConfig = require('../config/webpack.config');
	_.forOwn(configs, function(values, key) {
		configs[key] = _.map(values, function(v) {
			return 'theme/' + v;
		})
	})
	baseWebpackConfig.entry = configs;
	baseWebpackConfig.output.path = path.join(config.build.publicPath,area,theme,asset)
	baseWebpackConfig.output.publicPath = path.join('assets',area,theme,asset)
	baseWebpackConfig.resolve.alias.theme = path.join(config.build.resourcePath,area,theme,asset)

	return baseWebpackConfig
}

function themeCompile(config, callback) {
  	const areas = config.areas;

  	_.forOwn(areas, function(themes, area) {
  		_.forOwn(themes, function(assets, theme) {
  			_.forOwn(assets, function(configs, asset) {
	  			createWebpackComplier(genertareWebpackConfig(area, theme, asset, configs), callback)
	  		})
  		})
  	})
}  	

/**
 * Runs the multiple webpack.
 * @param {Function} [callback] A callback to be invoked once the build has
 *   been completed
 * @return {Promise} A Promise that is resolved once all builds have been
 *   created
 */
function run(callback) {
	themeCompile(readAssetConfig(assetpath), callback)
}

module.exports = {
	run: run
}