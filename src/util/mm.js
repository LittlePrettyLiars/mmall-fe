/*
* @Author: E2
* @Date:   2018-06-01 15:29:26
* @Last Modified by:   E2
* @Last Modified time: 2018-07-30 20:52:56
*/
// 添加hogan组件用于渲染
var Hogan =require('hogan.js');
var conf = {
	//当前接口地址和当前静态文件地址
	serverHost : ''
};
var _mm = {
	//网络请求
	request: function(param){
		var _this = this;
		$.ajax({
			type     : param.method || 'get',
			url      : param.url    || '',
			dataType : param.type   || 'json',
			data     : param.data   || '',
			success: function(res){
				//请求成功
				if(res.status === 0){
				// && 如果前面的是错误的，因为短路，不会执行后面的，如果前面的是对的，还是要执行后面的代码，这是一种简化
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//没有登录状态，需要强制登录
				else if(res.status === 10){
					_this.doLogin();
				}
				//请求数据错误
				else if(res.status === 1){
					typeof param.error === 'function' && param.error(res.msg);					
				}

			},
			error:function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl : function(path) {
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
		var    reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var    result  = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	renderHtml : function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
			result   = template.render(data);
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功!');
	},
	//错误提示
	errorTips : function(msg){
		alert(msg || '哪里不对了~');
	},
	//表单字段验证，支持非空、手机，邮箱的判断
	validate : function(value,type){
		var value = $.trim(value);
		//非空验证
		if(type === 'require'){
			return !!value;
		}
		//手机号验证
		if(type === 'phone'){
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if(type === 'email'){
			// return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin : function(){
		window.location.href='./user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//跳到首页
	goHome : function(){
		window.location.href = './index.html';
	}
};
module.exports = _mm;