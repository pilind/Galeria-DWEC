"use strict";

function Landscape() {
	Image.call(this);
}
Landscape.prototype = Object.create(Image.prototype);
Landscape.prototype.constructor = Landscape;
