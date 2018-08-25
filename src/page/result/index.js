/*
* @Author: E2
* @Date:   2017-11-19 21:52:46
* @Last Modified by:   E2
* @Last Modified time: 2018-08-25 20:02:58
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
});