var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.join(__dirname, 'src');
var OUT_DIR = path.join(__dirname, 'out');

var babelSettings = {
	plugins: [
		'transform-class-properties',
		'transform-object-rest-spread',
		'transform-runtime'
	]
};

var loaders = [
	{ test: /\.ts$/, loaders: ['babel-loader?' + JSON.stringify(babelSettings)], exclude: /node_modules[\\/]/ },
	{ test: /\.ts$/, include: /src/, loader: 'babel-loader' },
	{ test: /\.ts$/, loader: 'ts-loader', query: { silent: true } }
];

module.exports = [{
	context: SRC_DIR,
	target: 'node',
	entry: { server: './server.ts' },
	resolve: {
		extensions: ['.js', '.ts']
	},
	output: {
		path: OUT_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: loaders
	},
	node: {
		__dirname: false,
		__filename: false
	}
},
{
	context: SRC_DIR,
	entry: { game: './game.ts' },
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			sengine: path.resolve(__dirname, '../../src')
		}
	},
	output: {
		path: OUT_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: loaders
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'Simple Example',
			template: 'index.ejs'
		})
	]
}];
