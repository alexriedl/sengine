var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var SRC_DIR = path.join(__dirname, 'src');
var OUT_DIR = path.join(__dirname, 'out');

const exampleEntries = {};
const plugins = [];
var exampleList = '';
fs.readdirSync(SRC_DIR)
	.filter(f => fs.statSync(path.join(SRC_DIR, f)).isDirectory())
	.forEach(dir => {
		exampleEntries[dir] = `./${dir}/index.ts`;
		exampleList += `<li><a href='/${dir}.html'>${dir}</a></li>`;
		let info = 'Basic information about this example.';
		const infoPath = path.join(SRC_DIR, dir, 'info.html');
		if (fs.existsSync(infoPath)) {
			info = fs.readFileSync(infoPath);
		}
		plugins.push(new htmlWebpackPlugin({
			title: dir,
			filename: `${dir}.html`,
			template: `example.ejs`,
			chunks: [dir],
			info
		}));
	});

plugins.push(new htmlWebpackPlugin({
	title: 'SEngine Examples',
	filename: 'index.html',
	template: 'index.ejs',
	chunks: [],
	list: exampleList
}));

var loaders = [
	{ test: /\.ts$/, include: /src/, loader: 'babel-loader' },
	{ test: /\.ts$/, loader: 'ts-loader', query: { silent: true } },
	{ test: /\.(png)?$/, loader: "file-loader?name=/images/[name].[ext]" }
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
	entry: exampleEntries,
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			sengine: path.resolve(__dirname, '../src')
		}
	},
	output: {
		path: OUT_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: loaders
	},
	plugins
}];
