"use strict";

//Singleton
const Gallery = (function () {
	let instantiated = null;

	function init() {

		function Gallery() {
			if (!this instanceof Gallery)
				throw new GalleryInvalidInvoke();

			//Campos privados
			let _title;
			let _images = [];
			let _categories = [];
			let _authors = [];
			let _landscapes = [];
			let _portraits = [];

			let _defCategory = new Category();
			_defCategory.title = "DefCategory";
			_defCategory.description = "Categoria por defecto";

			let _defAuthor = new Author("DefAuthor", "defauthor@gmail.com");

			//Métodos
			this.addCategory = function (category) {
				if (category === null)
					throw new NullCategoryException(category);

				if (_categories.includes(category))
					throw new CategoryAddedException(category);


				_categories.push(category);

				return Number.parseInt(_categories.length);
			}

			this.removeCategory = function (category) {
				if (!(_categories.includes(category)))
					throw new CategoryNotRegisteredException(category);
				_categories.splice(_categories.indexOf(category), 1);

				return Number.parseInt(_categories.length);
			}

			this.addImage = function (image, category, author) {
				if (image === null)
					throw new NullImageException(image);

				image = image;
				image.author = _authors[_authors.indexOf(author)].nickname;
				category.images.push(image);

				if (image instanceof Image) {
					_images.push(image);
				}

				if (image instanceof Landscape) {
					_landscapes.push(image);
				} else {
					_portraits.push(image);
				}

				return Number.parseInt(_images.length);
			}

			this.removeImage = function (image) {
				if (!(_images.includes(image)))
					throw new ImageNotRegisteredException(image);

				_images.splice(_images.find(img => img === image), 1);

				return Number.parseInt(_images.length);
			}

			this.getCategoryImages = function (category) {
				if (category === null)
					throw new NullCategoryException(category);

				return category.images;
			}

			this.addAuthor = function (author) {
				if (author === null)
					throw new NullAuthorException(author);
				_authors.push(author);

				return Number.parseInt(_authors.length);
			}

			this.removeAuthor = function (author) {
				if (!(_authors.includes(author)))
					throw new AuthorNotRegisteredException(author);

				_authors.splice(_authors.indexOf(author), 1);

				return Number.parseInt(_authors.length);
			}

			this.getAuthorImages = function (author) {
				if (author === null)
					throw new NullAuthorException(author);

				return _images.filter(function (image) {
					return image.author === _authors[_authors.indexOf(author)].nickname;
				});
			}

			this.getPortraits = function () {
				return _portraits;
			}

			this.getLandscapes = function () {
				return _landscapes;
			}

			Object.defineProperty(this, "title", {
				get: function () {
					return _title;
				},

				set: function (value) {
					if (value === "") throw new EmptyTitleException(_title);
					_title = value;
				}
			});

			Object.defineProperty(this, "categories", {
				get: function () {
					return _categories;
				}
			});

			Object.defineProperty(this, "authors", {
				get: function () {
					return _authors;
				}
			});

			//Iteradores
			Object.defineProperty(this, 'categoriesIterator', {
				get: function () {
					let nextIndex = 0;
					return {
						next: function () {
							return nextIndex < _categories.length ?
								{ value: _categories[nextIndex++], done: false } :
								{ done: true };
						}
					}
				}
			});

			Object.defineProperty(this, 'authorsIterator', {
				get: function () {
					let nextIndex = 0;
					return {
						next: function () {
							return nextIndex < _authors.length ?
								{ value: _authors[nextIndex++], done: false } :
								{ done: true };
						}
					}
				}
			});

			Object.defineProperty(this, 'imagesIterator', {
				get: function () {
					let nextIndex = 0;
					return {
						next: function () {
							return nextIndex < _images.length ?
								{ value: _images[nextIndex++], done: false } :
								{ done: true };
						}
					}
				}
			});
		}

		let gal = new Gallery();
		return gal;
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

