"use strict";

class Image {
	#title
	#description
	#url
	#coords

	constructor(title, url) {
		this.#title = title;
		this.#url = url;
		this.#description = '';
		this.#coords = '';
	}

	get title() {
		return this.#title;
	}

	set title(value) {
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

	get coords() {
		return this.#coords;
	}

	set coords(value) {
		this.#coords = value;
	}
}

class Landscape extends Image {
	constructor(title, url) {
		super(title, url);
	}
}

class Portrait extends Image {
	constructor(title, url) {
		super(title, url);
	}
}

class Default extends Image {
	constructor(title, url) {
		super (title, url);
	}
}

