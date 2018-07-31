/*
* @Author: E2
* @Date:   2018-06-28 11:56:14
* @Last Modified by:   E2
* @Last Modified time: 2018-07-30 20:41:15
*/
var  _mm = require('util/mm.js');
var _user = {
	//用户登录
	// 登录
	login: function(userdata, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/login.do'),
	        data: userdata,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
	},
	// 注册
	register: function(userdata, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/register.do'),
	        data: userdata,
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
	},
	// 检查登录
	checkLogin: function(resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/get_user_info.do'),
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
	},
	// 检查用户名是否存在
	checkUsername: function(username, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/check_valid.do'),
	        data: {
	            type: "username",
	            str: username
	        },
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	// 得到问题
	getQuestion: function(userdata, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/forget_get_question.do'),
	        data: userdata,
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	// 检查答案
	checkAnwser: function(userdata, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/forget_check_answer.do'),
	        data: userdata,
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	// 重置密码
	reset: function(userdata, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/forget_reset_password.do'),
	        data: userdata,
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	// 获取用户信息
	getUserInfo: function(resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/get_user_info.do'),
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	updataUserInfo: function(data, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/update_information.do'),
	        data: data,
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	},
	passwordUpdata: function(data, resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/reset_password.do'),
	        data: data,
	        method: "post",
	        success: resolve,
	        error: reject
	    })
	}, // 处理登出
	loginOut: function(resolve, reject) {
	    _mm.request({
	        url: _mm.getServerUrl('/user/logout.do'),
	        method: 'POST',
	        success: resolve,
	        error: reject
	    });
	}
}
module.exports = _user;