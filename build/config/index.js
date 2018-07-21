var path = require('path')

module.exports = {
	build: {
		basePath: path.join(__dirname, '../../'),
		appPath: path.join(__dirname, '../../app/'),
		vendorPath: path.join(__dirname, '../../vendor/'),
		resourcePath: path.join(__dirname, '../../resources/assets/'),
		publicPath: path.join(__dirname, '../../public/assets/'),
		assetConfigPath: path.join(__dirname, '../../resources/assets/config.json')
	},
	package: require(path.join(__dirname, '../../package.json')).mods
}