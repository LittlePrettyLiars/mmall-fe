/*
* @Author: E2
* @Date:   2017-10-26 11:46:21
* @Last Modified by:   E2
* @Last Modified time: 2017-10-26 17:22:10
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user         = require('service/user-service.js');


//page逻辑部分
var page = {
	init: function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name:'user-pass-update'
		});
	},
	//通过javascript渲染，如果最开始就直接bindEvent，是不会生效的，所以选择全局监听事件，通过事件冒泡
	bindEvent : function(){
		var _this =this;
		//点击提交按钮后的动作
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password        : $.trim($('#password').val()),
				passwordNew     : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户密码
				_user.updatePassword({
					passwordOld: userInfo.password,
					passwordNew: userInfo.passwordNew
				},function(res,msg){
					_mm.successTips(msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	//验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		//验证原密码是否为空
		if(!_mm.validate(formData.password,'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码长度
		//此处知识点，或逻辑的执行顺序，如果不执行前面的条件，而passwordNew如果是undefined或者null的类型，则直接执行后面的条件会报错，因为他们是没有.length属性的，
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '密码长度不能收于6位';
			return result;
		}
		//验证两次输入的密码是否一致
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}

		//通过验证，返回正确提示
		result.status = true,
		result.msg = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});
