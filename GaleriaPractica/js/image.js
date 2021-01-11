"use strict";

function Image(title, url) {
	let _title, _description, _url, _coords;

	_title = title;
	_url = url;

	Object.defineProperty(this, "title", {
		get: function () {
			return _title;
		}
	})

	Object.defineProperty(this, "description", {
		get: function () {
			return _description;
		},
		set: function (value) {
			_description = value;
		}
	});

	Object.defineProperty(this, "url", {
		get: function () {
			return _url;
		}
	});

	Object.defineProperty(this, "coords", {
		get: function () {
			return _coords;
		},
		set: function (value) {
			_coords = value;
		}
	});

}
Image.prototype = {};
Image.prototype.constructor = Image;

Image.prototype.setTitle = function(value) {
	this.title = value;
}

Image.prototype.getTitle = function() {
	return this.title;
}

Image.prototype.setUrl = function(value) {
	this.url = value;
}

Image.prototype.getUrl = function() {
	return this.url;
}
