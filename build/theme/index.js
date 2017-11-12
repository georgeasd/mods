var path = require('path'),
	fs = require('fs'),
	Promise = require('bluebird'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	glob = require("glob"),
	_ = require('lodash');
	config = require('../config'),
	assetpath = config.build.assetConfigPath,
	PrettyError = require('pretty-error'),
    pe = new PrettyError();

function readAssetConfig(assetpath){
	try {
	  fs.statSync(assetpath)
	  return require(assetpath)
	} catch (e) {
	 	throw new Error("Asset config File does not exist. \n" +
	 	"Run theme:compile to generate the file");
	}
}

function genertareWebpackConfig(area, theme, configs, modulePaths) {
	var baseWebpackConfig = require('../config/webpack.config');
	var found = {};

	modulePaths.forEach(function(item) {	
		item = item+'/**/'+area+'/**/webpack.config.js';
	    glob.sync(item).forEach(function(path) {
	      found[path] = null;	      
	    });
	});
	found = Object.keys(found);
	
	found.forEach(function(path) {
	    baseWebpackConfig = merge.smart(baseWebpackConfig, require(path));
	});

	baseWebpackConfig.resolve.alias.themePath = config.build.resourcePath+'/'+area+'/'+theme;
	baseWebpackConfig.entry = configs;
	baseWebpackConfig.output.path = path.join(config.build.publicPath,area,theme);
	baseWebpackConfig.output.publicPath = '/assets/'+area+'/'+theme+'/';

	return baseWebpackConfig
}

function themeCompile(assetConfig) {
  	const areas = assetConfig.areas;
  	const handles = assetConfig.handles;
  	const modulePaths = assetConfig.modulePaths;
  	const webpackCompilers = [];
  	_.forOwn(areas, function(themes, area) {
  		_.forOwn(themes, function(assets, theme) {
  			const entries = _.zipObject(handles[area], _.map(handles[area]).map(function(val) {
  				return path.join(config.build.resourcePath,area,theme,'webpack', val+'.js');
  			}));
  			webpackCompilers.push(webpack(genertareWebpackConfig(area, theme, entries, modulePaths)));
  		});
  	});

  	webpackCompilers.forEach(function(compiler) {
  		compiler.run((err, stats) => {

  		if (err) {
  			var renderedError = pe.render(err)
  			console.log(renderedError)
  			process.exit();
		    return
		}

		process.stdout.write(stats.toString({
		    colors: true,
		    modules: false,
		    children: false,
		    chunks: false,
		    chunkModules: false
		  }) + '\n\n')
		});
  	});
}  	

/**
 * Runs multiple webpack instances.
 * @return void
 */
function run() {
	themeCompile(readAssetConfig(assetpath))
}

module.exports = {
	run: run
}