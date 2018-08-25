/*
* @Author: E2
* @Date:   2017-11-19 16:48:55
* @Last Modified by:   E2
* @Last Modified time: 2018-08-25 11:55:22
*/

require("./layout.css");
require("font_awesome/css/font-awesome.min.css");
require("page/common/nav/index.js");
require("page/common/footer/index.css");
require("page/common/header/index.js");
var navSide = require("./nav-side/index.js");
navSide.init({
    name: "order-list"
});
