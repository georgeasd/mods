var path = require('path')

module.exports = {
	build: {
		resourcePath: path.join(__dirname, '../../resources/'),
		assetsPublicPath: path.join(__dirname, '../../public/'),
	}
}