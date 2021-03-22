"use strict";

class Category {
	#title
	#url
	#description

	constructor(title = 'Anon', url = 'https://via.placeholder.com/258x172.jpg?text=SinNombre') {
		this.#title = title;
		this.#url = url;
		this.#description = '';
	}

	get title() {
		return this.#title;
	}

	set title(value = 'Anon') {
		this.#title = value;
	}

	get url() {
		return this.#url;
	}

	set url(value) {
		this.#url = value;
	}

	get description() {
		return this.#description;
	}

	set description(value) {
		this.#description = value;
	}
}

Object.defineProperty(Category.prototype, 'title' ,{enumerable: true});
Object.defineProperty(Category.prototype, 'url', {enumerable: true});
Object.defineProperty(Category.prototype, 'description', {enumerable: true});
