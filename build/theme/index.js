const path = require('path'),
	Promise = require('bluebird'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	glob = require("glob"),
	_ = require('lodash');
	config = require('../config'),
	assetpath = config.build.assetConfigPath,
	PrettyError = require('pretty-error'),
    pe = new PrettyError(),
    loadJsonFile = require('load-json-file'),
    writeJsonFile = require('write-json-file');

global.__base = __dirname + '/../';    

function readAssetConfig(assetpath){
	try {	  
	  return loadJsonFile.sync(assetpath);
	} catch (e) {
	 	throw new Error("Asset config File does not exist. \n" +
	 	"Run theme:webpack to generate the file  \n \n");
	}
}

function updateJsonFile(filePath, updater, options){
  return Promise.resolve()
    .then(() => loadJsonFile(filePath))
    .catch(err => {
      if (options && options.defaultValue) {
        if (typeof options.defaultValue === 'function') {
          return options.defaultValue();
        }
        return options.defaultValue;
      }
      throw err;
    })
    .then(data => updater(data))
    .then(data => writeJsonFile(filePath, data, options));
};

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
  	const webpackCompilers = {};
  	_.forOwn(areas, function(themes, area) {
  		_.forOwn(themes, function(assets, theme) {
  			const entries = _.zipObject(handles[area], _.map(handles[area]).map(function(val) {
  				return path.join(config.build.resourcePath,area,theme,'webpack', val+'.js');
  			}));
  			webpackCompilers[area+'_'+theme] = webpack(genertareWebpackConfig(area, theme, entries, modulePaths));
  		});
  	});

  	_.forEach(webpackCompilers, function(compiler, areaTheme) {
  		compiler.run((err, stats) => {

	  		if (err) {
	  			var renderedError = pe.render(err);
	  			console.log(renderedError);
	  			process.exit();
			    return;
			}
			updateMetadata(stats, areaTheme);
			process.stdout.write(stats.toString({
			    colors: true,
			    modules: false,
			    children: false,
			    chunks: false,
			    chunkModules: false
			}) + '\n\n');
		});
	});		
}

function updateMetadata(stats, areaTheme) {
	var c = stats.toJson();
	var areaTheme = areaTheme.split('_');
	var compiledAsset = {};
	updateJsonFile(path.join(config.build.resourcePath,areaTheme[0],areaTheme[1], 'manifest.json'), function(data) { 		
 		return Object.assign({}, data, {compiledAsset:compiledAsset});
 	});
	_.forEach(c.entrypoints, function(obj, handle) {
		  compiledAsset[handle] = {
		  	 js:[],
		  	 css:[]
		  };
  		_.forEach(obj.assets, function(value) {
  		 	if(/.js($|\?)/.test(value)) {
 				compiledAsset[handle]['js'].push(value);
	 		} else if(/.css($|\?)/.test(value)) {
	 			compiledAsset[handle]['css'].push(value);	
	 		}
		});
  	});

  	updateJsonFile(path.join(config.build.resourcePath,areaTheme[0],areaTheme[1], 'manifest.json'), function(data) { 		
 		return Object.assign({}, data, {compiledAsset:compiledAsset});
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