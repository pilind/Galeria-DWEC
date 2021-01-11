"use strict";

function BaseException(message = "Default Message", fileName, lineNumber) {
	let instance = new Error(message, fileName, lineNumber);
	instance.name = "MyError";
	Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
	if (Error.captureStackTrace) {
		Error.captureStackTrace(instance, BaseException);
	}
	return instance;
}
BaseException.prototype = Object.create(Error.prototype, {
	constructor: {
		value: BaseException,
		enumerable: false,
		writable: true,
		configurable: true
	}
});
BaseException.prototype.constructor = BaseException;


function GalleryException() {
	let instance = BaseException.call(this, "Error: Gallery Exception.");
	instance.name = "GalleryException";
	return instance;
}
GalleryException.prototype = Object.create(BaseException.prototype);
GalleryException.prototype.constructor = GalleryException;

function EmptyTitleException(title) {
	let instance = BaseException.call(this, "Error: The parameter " + title + " cannot be empty.");
	instance.name = "EmptyTitleException";
	instance.title = title;
	return instance;
}
EmptyTitleException.prototype = Object.create(BaseException.prototype);
EmptyTitleException.prototype.constructor = EmptyTitleException;

function CategoryAddedException(category) {
	let instance = BaseException.call(this, "Error: The category " + category + " is already added.");
	instance.name = "CategoryAddedException";
	instance.category = category;
	return instance;
}
CategoryAddedException.prototype = Object.create(BaseException.prototype);
CategoryAddedException.prototype.constructor = CategoryAddedException;

function NullCategoryException(category) {
	let instance = BaseException.call(this, "Error: The category cannot be null.");
	instance.name = "NullCategoryException";
	instance.category = category;
	return instance;
}
NullCategoryException.prototype = Object.create(BaseException.prototype);
NullCategoryException.prototype.constructor = NullCategoryException;

function CategoryNotRegisteredException(category) {
	let instance = BaseException.call(this, "Error: The category " + category + " is not registered.");
	instance.name = "CategoryNotRegisteredException";
	instance.category = category;
	return instance;
}
CategoryNotRegisteredException.prototype = Object.create(BaseException.prototype);
CategoryNotRegisteredException.prototype.constructor = CategoryNotRegisteredException;

function NullImageException(image) {
	let instance = BaseException.call(this, "Error: The image cannot be null.");
	instance.name = "NullImageException";
	instance.image = image;
	return instance;
}
NullImageException.prototype = Object.create(BaseException.prototype);
NullImageException.prototype.constructor = NullImageException;

function ImageNotRegisteredException(image) {
	let instance = BaseException.call(this, "Error: The image" + image + " is not registered.");
	instance.name = "ImageNotRegisteredException";
	instance.image = image;
	return instance;
}
ImageNotRegisteredException.prototype = Object.create(BaseException.prototype);
ImageNotRegisteredException.prototype.constructor = ImageNotRegisteredException;

function NullAuthorException(author) {
	let instance = BaseException.call(this, "Error: The author cannot be null.");
	instance.name = "NullAuthorException";
	instance.author = author;
	return instance;
}
NullAuthorException.prototype = Object.create(BaseException.prototype);
NullAuthorException.prototype.constructor = NullAuthorException;

function AuthorNotRegisteredException(author) {
	let instance = BaseException.call(this, "Error: The author" + author + " is not registered.");
	instance.name = "AuthorNotRegisteredException";
	instance.image = author;
	return instance;
}
AuthorNotRegisteredException.prototype = Object.create(BaseException.prototype);
AuthorNotRegisteredException.prototype.constructor = AuthorNotRegisteredException;

function IndexOutBoundsException() {
	let instance = BaseException.call(this, "Error: The index is out of bounds.");
	instance.name = "IndexOutBoundsException";
	return instance;
}
IndexOutBoundsException.prototype = Object.create(BaseException.prototype);
IndexOutBoundsException.prototype.constructor = IndexOutBoundsException;

function InvalidParamException() {
	let instance = BaseException.call(this, "Error: The param is invalid.")
	instance.name = "InvalidParamException";
	return instance;
}
InvalidParamException.prototype = Object.create(BaseException.prototype);
InvalidParamException.prototype.constructor = InvalidParamException;

function GalleryInvalidInvoke() {
	let instance = BaseException.call(this, "Error: You must invoke with the constructor")
	instance.name = "GalleryInvalidInvoke";
	return instance;
}
GalleryInvalidInvoke.prototype = Object.create(BaseException.prototype);
GalleryInvalidInvoke.prototype.constructor = GalleryInvalidInvoke;
