var plugins = require('gulp-load-plugins')();
var pathObj = require('path');
var cleanCSS = require('gulp-clean-css');

module.exports = function(gulp, config, path) {
	var areas = config.areas,
		paths = config.path;
	areas.forEach(function(area) {
		var areaThemes = config[area]['themes'];
		areaThemes.forEach(function(theme) {
			var areaThemepath = pathObj.join(paths.resources,path,area,theme,'/**/*.css');
			var outputPath = pathObj.join(paths.public,path,area,theme);
			gulp.src(areaThemepath)
			    .pipe(plugins.concat("bundle.css"))
			    .pipe(cleanCSS())
			    .pipe(gulp.dest(outputPath));
		});
		
	});
};