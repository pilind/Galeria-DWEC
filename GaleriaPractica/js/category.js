"use strict";

function Category() {
	let _title;
	let _description;


	Object.defineProperty(this, "title", {
		get: function () {
			return _title;
		},
		set: function (value) {
			_title = value;
		}
	})

	Object.defineProperty(this, "description", {
		get: function () {
			return _description;
		},
		set: function (value) {
			_description = value;
		}
	})
}
Category.prototype = {};
Category.prototype.constructor = Category;
