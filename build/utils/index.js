
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const compact = require('lodash/compact');
const devMode = process.env.NODE_ENV !== 'production';

function getStyleLoaders(config) {
	return [{
		resourceQuery: /module/,
		use: [
	      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,	      
	      {
	        loader: 'css-loader',
	        options: {
	          // enable CSS modules
	          modules: true,
	          // customize generated class names
	          localIdentName: '[local]_[hash:base64:8]'
	        }
	      },
	      {
	        loader: 'postcss-loader',
	        options: {
	          plugins: function () { 
	            return [
	              require('precss'),
	              require('autoprefixer')
	            ];
	          }
	        }
	      },
	      'sass-loader'
	    ]
	}, {
		use: [
	      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,	      
	      'css-loader',
	      {
	        loader: 'postcss-loader',
	        options: {
	          plugins: function () { 
	            return [
	              require('precss'),
	              require('autoprefixer')
	            ];
	          }
	        }
	      },
	      'sass-loader'
	    ]
	}];
}

function getBabelConfig(config) {
	return {
		comments: false,
		babelrc: false,
		presets: compact([
			'@babel/preset-env',
			config.vue ? 'vue': false,
			config.react ? '@babel/preset-react': false,
		]),
		plugins: compact([
			'@babel/plugin-transform-runtime'
		])
	};
}

module.exports = {
	getStyleLoaders,
	getBabelConfig
};