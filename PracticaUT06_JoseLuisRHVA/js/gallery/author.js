"use strict";

class Author {
	#nickname
	#email
	#avatar

	constructor(nickname = 'Anon', email) {
		this.#nickname = nickname;
		this.#email = email;
	}

	get nickname() {
		return this.#nickname;
	}

	set nickname(value) {
		this.#nickname = value;
	}

	get email() {
		return this.#email;
	}

	set email(value) {
		this.#email = value;
	}

	get avatar() {
		return this.#avatar;
	}

	set avatar(value) {
		this.#avatar = value;
	}
}
