var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.join(__dirname, 'src');
var OUT_DIR = path.join(__dirname, 'dist');

var babelSettings = {
	plugins: [
		'transform-class-properties',
		'transform-object-rest-spread',
		'transform-runtime'
	]
};

module.exports = {
	context: SRC_DIR,
	entry: { index: './index.ts' },
	resolve: {
		extensions: ['.js', '.ts']
	},
	output: {
		path: OUT_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loaders: ['babel-loader?' + JSON.stringify(babelSettings)], exclude: /node_modules[\\/]/ },
			{ test: /\.ts$/, include: /src/, loader: 'babel-loader' },
			{ test: /\.ts$/, loader: 'ts-loader', query: { silent: true } }
		]
	}
};
