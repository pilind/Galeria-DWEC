"use strict";
function Portrait() {
	Image.call(this);
}
Portrait.prototype = Object.create(Image.prototype);
Portrait.prototype.constructor = Portrait;
