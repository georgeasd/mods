var plugins = require('gulp-load-plugins')();
var pathObj = require('path');
var cleanCSS = require('gulp-clean-css');

module.exports = function(gulp, config, path) {
	var areas = config.areas,
		paths = config.path;
	areas.forEach(function(area) {
		var areaThemes = config[area]['themes'];
		areaThemes.forEach(function(theme) {
			var areaThemepath = pathObj.join(paths.resources,path,area,theme,'/theme.less');
			var outputPath = pathObj.join(paths.public,'assets/css',area,theme);
			gulp.src(areaThemepath)
				.pipe(plugins.less())
				.pipe(plugins.autoprefixer())
			    .pipe(plugins.concat("theme-l.css"))
			    .pipe(cleanCSS())
			    .pipe(gulp.dest(outputPath));
		});
		
	});
};