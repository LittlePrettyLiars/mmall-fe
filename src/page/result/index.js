/*
* @Author: E2
* @Date:   2018-06-11 17:14:27
* @Last Modified by:   E2
* @Last Modified time: 2018-06-11 20:08:56
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

//用$function,虽然我们脚本是放在页面的body对象中，但是无法保证脚本运行时页面已经加载好
$(function(){
	var type     = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
})