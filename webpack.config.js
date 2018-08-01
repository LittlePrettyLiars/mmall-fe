/*
* @Author: E2
* @Date:   2018-05-30 15:35:14
* @Last Modified by:   E2
* @Last Modified time: 2018-07-31 16:16:07
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		title   : title,
		inject  : true,
		hash    : true,
		chunks  : ['common',name]
	};
};

var config = {
	entry: {
		"common"			: ["./src/./page/common/index.js"],
        "index"				: ["./src/./page/index/index.js"],
		"list"              : ["./src/./page/list/list.js"],
		"detail"			: ["./src/./page/detail/detail.js"],
		"cart"				: ["./src/./page/cart/cart.js"],
		"order-confirm"		: ["./src/./page/order-confirm/order-confirm.js"],
		"order-list"		: ["./src/./page/order-list/order-list.js"],
		"order-detail"		: ["./src/./page/order-detail/order-detail.js"],
		"pay"				: ["./src/./page/pay/pay.js"],
		"login"				: ["./src/page/user-login/user-login.js"],
		"register"			: ["./src/page/user-register/user-register.js"],
		"passwordReset"		: ["./src/page/passwordReset/passwordReset.js"],
		"user-center"		: ["./src/page/user-center/user-center.js"],
		"user-center-updata": ["./src/page/user-center-updata/user-center-updata.js"],
		"user-pass-updata"	: ["./src/page/user-pass-updata/user-pass-updata.js"],
		"result"			: ["./src/page/result/result.js"],
		"about"				: ["./src/page/about/about.js"],
	},
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: 'js/[name].js'
	},
	externals: {
		'jquery' : 'window.jQuery'			
	},
	module: {
	  loaders: [
	    { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
	    { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
	    { 
            test: /\.string$/, 
            loader: 'html-loader',
            query:{
                minimize:true,
                removeAttributeQuotes:false
            }
        }
	  ]
	},
	resolve: {
		alias: {
			node_modules :  __dirname + '/node_modules',
			util         :  __dirname + '/src/util',
			page         :  __dirname + '/src/page',
			service      :  __dirname + '/src/service',
			image        :  __dirname + '/src/image',
			font_awesome: __dirname + "/node_modules/font-awesome",
		}
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
		new HtmlWebpackPlugin(getHtmlConfig("index", "首页")),
		new HtmlWebpackPlugin(getHtmlConfig("list", "商品列表")),
		new HtmlWebpackPlugin(getHtmlConfig("detail", "商品详情")),
		new HtmlWebpackPlugin(getHtmlConfig("cart", "购物车")),
		new HtmlWebpackPlugin(getHtmlConfig("order-confirm", "订单确认")),
		new HtmlWebpackPlugin(getHtmlConfig("order-list", "订单列表")),
		new HtmlWebpackPlugin(getHtmlConfig("order-detail", "订单详情")),
		new HtmlWebpackPlugin(getHtmlConfig("pay", "支付")),
		new HtmlWebpackPlugin(getHtmlConfig("login", "登录")),
		new HtmlWebpackPlugin(getHtmlConfig("register", "注册")),
		new HtmlWebpackPlugin(getHtmlConfig("passwordReset", "找回密码")),
		new HtmlWebpackPlugin(getHtmlConfig("user-center", "个人中心")),
		new HtmlWebpackPlugin(getHtmlConfig("user-center-updata", "修改个人信息")),
		new HtmlWebpackPlugin(getHtmlConfig("user-pass-updata", "修改密码")),
		new HtmlWebpackPlugin(getHtmlConfig("result", "处理返回结果")),
		new HtmlWebpackPlugin(getHtmlConfig("about", "关于mmall")),
	]
};

if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
