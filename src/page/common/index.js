require("./layout.css");
require("font_awesome/css/font-awesome.min.css");
require("./nav/nav.js");
require("./footer/footer.css");
require("./header/header.js");
var navSide = require("./nav-side/nav-side.js");
navSide.init({
    name: "user-center"
});
