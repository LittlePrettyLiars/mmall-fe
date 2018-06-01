/*
* @Author: E2
* @Date:   2018-05-30 15:35:14
* @Last Modified by:   E2
* @Last Modified time: 2018-06-01 11:03:46
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		inject  : true,
		hash    : true,
		chunks  : ['common',name]
	};
};

var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js'],
	},
	output: {
		path: './dist',
		publicPath: '/dist',
		filename: 'js/[name].js'
	},
	externals: {
		'jquery' : 'window.jQuery'			
	},
	module: {
	  loaders: [
	    { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader",
	              use: "css-loader"})},
	    { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
	  ]
	},
	plugins: [
		//独立通用模块js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'
		}),
		//把CSS独立打包到文件
		new ExtractTextPlugin('css/[name].css'),
		//HTML模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))
	]
};

if(WEBPACK_ENV == 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;