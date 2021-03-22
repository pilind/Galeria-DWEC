"use strict";

class GalleryException extends BaseException {
	constructor(message = 'Error: Gallery Exception.', fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = 'GalleryException';
	}
}

class ObjecGalleryException extends GalleryException {
	constructor(param, className, fileName, lineNumber) {
		super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
		this.param = param;
		this.param = className;
		this.name = 'ObjecGalleryException';
	}
}

class CategoryExistsException extends GalleryException {
	constructor(category, fileName, lineNumber) {
		super(`Error: The ${category.title} already exists in the gallery.`, fileName, lineNumber);
		this.category = category;
		this.name = 'CategoryExistsException';
	}
}

class CategoryNotExistException extends GalleryException {
	constructor(category, fileName, lineNumber) {
		super(`Error: The ${category.title} doesn't exist in the gallery.`, fileName, lineNumber);
		this.category = category;
		this.name = 'CategoryNotExistException';
	}
}

class ImageExistsException extends GalleryException {
	constructor(image, fileName, lineNumber) {
		super(`Error: The ${image.title} already exists in the gallery.`, fileName, lineNumber);
		this.image = image;
		this.name = 'ImageExistsException';
	}
}

class ImageExistInCategoryException extends GalleryException {
	constructor(image, category, fileName, lineNumber) {
		super(`Error: The ${image.title} already exist in ${category.title}.`, fileName, lineNumber);
		this.category = category;
		this.image = image;
		this.name = 'ImageExistInCategoryException';
	}
}

class ImageNotExistInCategoryException extends GalleryException {
	constructor(image, category, fileName, lineNumber) {
		super(`Error: The ${image.title} doesn't exist in ${category.title}.`, fileName, lineNumber);
		this.category = category;
		this.image = image;
		this.name = 'ImageNotExistInCategoryException';
	}
}

class ImageNotExistInGalleryException extends GalleryException {
	constructor(image, fileName, lineNumber) {
		super(`Error: The ${image.title} doesn't exist in the gallery.`, fileName, lineNumber);
		this.image = image;
		this.name = 'ImageNotExistInGalleryException';
	}
}

class AuthorExistsException extends GalleryException {
	constructor(author, fileName, lineNumber) {
		super(`Error: The author ${author.nickname} already exists in the gallery.`, fileName, lineNumber);
		this.author = author;
		this.name = 'AuthorExistsException';
	}
}

class AuthorNotExistException extends GalleryException {
	constructor(author, fileName, lineNumber) {
		super(`Error: The ${author.nickname} doesn't exist in the gallery.`, fileName, lineNumber);
		this.author = author;
		this.name = 'AuthorNotExistException';
	}
}

//Singleton
let Gallery = (function () {
	let instantiated;

	function init() {

		class Gallery {
			#title
			#categories = [];
			#authors = [];

			constructor() {

			}

			get title() {
				return this.#title;
			}

			set title(value) {
				this.#title = value;
			}

			get categories() {
				let nextIndex = 0;
				let array = this.#categories;
				return {
					next: function () {
						return nextIndex < array.length ?
							{ value: array[nextIndex++].category, done: false } :
							{ done: true };
					}
				}
			}

			get authors() {
				let nextIndex = 0;
				let array = this.#authors;
				return {
					next: function () {
						return nextIndex < array.length ?
							{ value: array[nextIndex++], done: false } :
							{ done: true };
					}
				}
			}

			#getCategoryPosition(category) {
				return this.#categories.findIndex(x => x.category.title === category.title);
			}

			#getAuthorPosition(author) {
				return this.#authors.findIndex(x => x.nickname === author.nickname);
			}

			#getImagePositionInCategory(image, category) {
				return category.images.findIndex(x => x.image === image);
			}

			getCategory(title) {
				let position = this.#categories.findIndex(x => x.category.title === title);
				if (position === -1)
					throw new CategoryNotExistException(new Category(title));
				return this.#categories[position].category;
			}

			getAuthor(nickname) {
				let position = this.#authors.findIndex(x => x.nickname === nickname);
				if (position === -1)
					throw new AuthorNotExistException(new Author(nickname));
				return this.#authors[position];
			}

			getCategoryImages(category) {
				if (!(category instanceof Category)) {
					throw new ObjectGalleryException('category', 'Category');
				}
				let position = this.#getCategoryPosition(category);
				if (position !== -1) {
					let nextIndex = 0;
					let array = this.#categories[position].images;
					return {
						next: function () {
							return nextIndex < array.length ?
								{ value: array[nextIndex++], done: false } :
								{ done: true };
						}
					}
				} else {
					throw new CategoryNotExistException(category);
				}
			}

			getAuthorImages(author) {
				let authorImages = [];
				if (!(author instanceof Author)) {
					throw new ObjectGalleryException('author', 'Author');
				}
				for (let category of this.#categories) {
					for (let img of category.images) {
						if (img.author === author.nickname) {
							authorImages.push(img);
						}
					}
				}
				let nextIndex = 0;
				return {
					next: function () {
						return nextIndex < authorImages.length ?
							{ value: authorImages[nextIndex++], done: false } :
							{ done: true };
					}
				}
			}

			getImage(title) {
				let array = [];
				for (let category of this.#categories) {
					for (let img of category.images) {
						array.push(img);
					}
				}
				let position = array.findIndex(x => x.image.title === title);
				if (position === -1) {
					throw ImageNotExistInGalleryException(new Image('Anon'));
				}
				return array[position];
			}


			#order = {
				title: (imageA, imageB) => { return imageA.title < imageB.title ? -1 : 1 }
			}

			getTypeImages(type, field) {
				let nextIndex = 0;
				let aux = [];
				for (let category of this.#categories) {
					for (let img of category.images) {
						aux.push(img);
					}
				}
				let array = aux.filter(x => { return x.image instanceof type });
				if (this.#order[field]) {
					array.sort(this.#order[field]);
				}
				return {
					next: function () {
						return nextIndex < array.length ?
							{ value: array[nextIndex++], done: false } :
							{ done: true };
					}
				}
			}

			addCategory(category) {
				if (!(category instanceof Category)) {
					throw new ObjectGalleryException('category', 'Category');
				}

				let position = this.#getCategoryPosition(category);
				if (position === -1) {
					this.#categories.push({
						category: category,
						images: []
					});
					this.#categories.sort((catA, catB) => {
						return (catA.category.title.toLocaleLowerCase() < catB.category.title.toLocaleLowerCase()) ? -1 : 1;
					})
				} else {
					throw new CategoryExistsException(category);
				}
				return this.#categories.length;
			}

			addAuthor(author) {
				if (!(author instanceof Author)) {
					throw new ObjectGalleryException('author', 'Author');
				}

				let position = this.#getAuthorPosition(author);
				if (position === -1) {
					this.#authors.push(author);
					this.#authors.sort((autA, autB) => {
						return (autA.nickname.toLocaleLowerCase() < autB.nickname.toLocaleLowerCase()) ? -1 : 1;
					})
				} else {
					throw new AuthorExistsException(author);
				}
				return this.#authors.length;

			}

			addImage(image, category, author) {
				let pCategory = this.#getCategoryPosition(category);
				let pAuthor = this.#getAuthorPosition(author);

				if (pCategory !== -1) {
					this.#categories[pCategory].images.push({
						image: image,
						author: this.#authors[pAuthor].nickname,
					})
				}
				return this.#categories[pCategory].images.length;
			}

			removeImage(image) {
				let category = this.#categories.find(x => x.images.find(y => y.image === image));
				let position = this.#getImagePositionInCategory(image, category);
				if (position !== -1) {
					category.images.splice(position, 1);
				} else {
					throw new ImageNotExistException(image);
				}
				return category.images.length;
			}


			removeCategory() {
				for (let category of arguments) {
					if (!(category instanceof Category)) {
						throw new ObjecManagerException('category', 'Category');
					}
					let position = this.#getCategoryPosition(category);
					if (position !== -1) {
						this.#categories.splice(position, 1);
					} else {
						throw new CategoryNotExistException(category);
					}
				}
				return this.#categories.length;
			}

			removeAuthor(author) {
				if (!(author instanceof Author)) {
					throw new ObjectGalleryException('author', 'Author');
				}

				let position = this.#getAuthorPosition(author);
				if (position !== -1) {
					// let storedAuthor = this.
					this.#authors.splice(position, 1);
				} else {
					throw new AuthorNotExistException(author);
				}
				return this.#authors.length;
			}

			getPortraits() {
				let portraits = [];
				for (let category of this.#categories) {
					for (let img of category.images) {
						if (img.image instanceof Portrait) {
							portraits.push(img.image);
						}
					}
				}
				return portraits;
			}

			getLandscapes() {
				let landscapes = [];
				for (let category of this.#categories) {
					for (let img of category.images) {
						if (img.image instanceof Landscape) {
							landscapes.push(img.image);
						}
					}
				}
				return landscapes;
			}

			clean() {
				this.#categories.length = 0;
				this.#authors.length = 0;
			}


		}

		Gallery.prototype.toString = function (separator = '\n') {
			let str = '';
			let categories = this.categories;
			let category = categories.next();
			while (!category.done) {
				str += category.value.title + separator;
				//console.log(category.value.title);
				let images = this.getCategoryImages(category.value);
				let image = images.next();
				while (!image.done) {
					//console.log(product.value.toString());
					str += image.value.toString() + separator;
					image = images.next();
				}
				category = categories.next();
			}
			return str;
		}

		let gallery = new Gallery();
		Object.freeze(gallery);
		return gallery;

	}


	return {
		getInstance: function () {
			if (!instantiated) {
				instantiated = init();
			}
			return instantiated;
		}
	};
})();


