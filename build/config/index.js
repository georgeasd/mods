var path = require('path')

module.exports = {
	build: {
		resourcePath: path.join(__dirname, '../../resources/assets/'),
		publicPath: path.join(__dirname, '../../public/assets/'),
		assetConfigPath: path.join(__dirname, '../../resources/assets/config.json')
	}
}