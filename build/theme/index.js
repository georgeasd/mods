var path = require('path'),
	fs = require('fs'),
	Promise = require('bluebird'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	_ = require('lodash');
	config = require('../config'),
	assetpath = config.build.assetConfigPath
	builderCounter = 0;

function readAssetConfig(assetpath){
	try {
	  fs.statSync(assetpath)
	  return require(assetpath)
	} catch (e) {
	 	throw new Error("Asset config File does not exist. \n" +
	 	"Run theme:compile to generate the file");
	}
}

function createWebpackComplier(options, callback) {
	return webpack(options, function(err, stats) {
	  if(err){callback(true, error);}		
	  process.stdout.write(stats.toString({
	    colors: true,
	    modules: false,
	    children: false,
	    chunks: false,
	    chunkModules: false
	  }) + '\n\n')
	  --builderCounter
	  if(builderCounter <= 0){
	  	callback(false);
	  }
	})
}

function genertareWebpackConfig(area, theme, configs) {
	var baseWebpackConfig = require('../config/webpack.config');

	baseWebpackConfig.entry = configs;
	baseWebpackConfig.output.path = path.join(config.build.publicPath,area,theme)
	baseWebpackConfig.output.publicPath = path.join('assets',area,theme)
	
	return baseWebpackConfig
}

function themeCompile(assetConfig, callback) {
  	const areas = assetConfig.areas;
  	const handles = assetConfig.handles;
  	_.forOwn(areas, function(themes, area) {
  		_.forOwn(themes, function(assets, theme) {
  			const entries = _.zipObject(handles[area], _.map(handles[area]).map(function(val) {
  				return path.join(config.build.resourcePath,area,theme,'webpack', val+'.js');
  			}));
  			builderCounter++;
  			createWebpackComplier(genertareWebpackConfig(area, theme, entries), callback)	
  		})
  	})
}  	

/**
 * Runs the multiple webpack.
 * @return {Promise} A Promise that is resolved once all builds have been
 *   created
 */
function run() {
	return new Promise(function(resolve, reject) {
		try {
			themeCompile(readAssetConfig(assetpath), function (err, error) {
				if(err) {reject(error)}
				else {resolve()}
			})	
		} catch(e) {
			reject(e)
		}
    });
}

module.exports = {
	run: run
}