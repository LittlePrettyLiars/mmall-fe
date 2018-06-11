/*
* @Author: E2
* @Date:   2018-06-09 11:12:44
* @Last Modified by:   E2
* @Last Modified time: 2018-06-11 09:46:52
*/
require('./index.css');

var _mm = require('util/mm.js')

//通用页面头部
var header = {
	init: function() {
		this.bindEvent();
	},
	onload: function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit:function(){
		var keyword = $.trim($('#search-input').val());
		//提交时有keyword,则跳转到list
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//提交时没有keyword,则跳转到首页
		else {
			_mm.goHome();
		}
	}
};

header.init();