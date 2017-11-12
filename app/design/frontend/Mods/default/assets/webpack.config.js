const webpack = require('webpack')

module.exports = {
  	resolve: {
	    alias: {
	        jquery: "themePath/js/jquery"
	    }
	},
	plugins: [
		new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    "window.jQuery": "jquery"
		})
	]
};