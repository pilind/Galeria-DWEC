"use strict";

function Author(nickname, email) {
	let _nickname, _email, _avatar;

	_nickname = nickname;
	_email = email;

	Object.defineProperty(this, "nickname", {
		get: function () {
			return _nickname;
		}
	});

	Object.defineProperty(this, "email", {
		get: function () {
			return _email;
		}
	});

	Object.defineProperty(this, "avatar", {
		get: function () {
			return _avatar;
		},
		set: function (value) {
			_avatar = value;
		}
	});
}
Author.prototype = {};
Author.prototype.constructor = Author;
