"use strict";

function Coords(latitude, longitude) {
	let _latitude, _longitude;

	_latitude = latitude;
	_longitude = longitude;

	Object.defineProperty(this, "latitude", {
		get: function () {
			return _latitude;
		},
		set: function (value) {
			_latitude = value;
		}
	});

	Object.defineProperty(this, "longitude", {
		get: function () {
			return _longitude;
		},
		set: function (value) {
			_longitude = value;
		}
	});
}
Coords.prototype = {};
Coords.prototype.constructor = Coords;
