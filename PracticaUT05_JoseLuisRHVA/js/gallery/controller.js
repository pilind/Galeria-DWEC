"use strict";

class GalleryController {
	#modelGallery;
	#viewGallery;

	constructor(modelGallery, viewGallery) {
		this.#modelGallery = modelGallery;
		this.#viewGallery = viewGallery;


		this.onLoad();
		this.onInit();
	}

	#loadGalleryObjects() {
		let category1 = new Category('Mercedes-Benz', './img/Mercedes-Benz-Logo.png');
		let category2 = new Category('Audi', './img/Audi-logo.png');
		let category3 = new Category('Land Rover', './img/Land-Rover-Logo.png');
		let category4 = new Category('Volkswagen', './img/volkswagen_logo.jpg');
		category1.description = 'The best or nothing';
		category2.description = 'The power of imagination';
		category3.description = 'Capable of great things';
		category4.description = 'Volkswagen';

		let gallery = this.#modelGallery;
		gallery.addCategory(category1);
		gallery.addCategory(category2);
		gallery.addCategory(category3);
		gallery.addCategory(category4);

		let image1 = new Default('Mercedes-Benz Clase S', './img/clase-s.jpg');
		let image2 = new Default('Audi RS5', './img/rs5.jpg');
		let image3 = new Default('Range Rover Evoque', './img/evoque.jpg');
		let image4 = new Default('Volkswagen Arteon', './img/arteon.jpg');
		let image5 = new Portrait('Volkswagen Golf GTI', './img/golf-gti.jpg');
		let image6 = new Landscape('Mercedes-Benz AMG', './img/amg.jpg');
		let image7 = new Landscape('Audi Q8', './img/q8.jpg');
		let image8 = new Portrait('Range Rover Velar', './img/velar.jpeg');

		let author1 = new Author('Pepito', 'pepito1@gallery.com');
		let author2 = new Author('Manolito', 'manolito1@gallery.com');
		let author3 = new Author('Antoñito', 'antoñito1@gallery.com');
		let author4 = new Author('Miguelito', 'miguelito1@gallery.com');

		author1.avatar = './img/pepito.jpg';
		author2.avatar = './img/manolito.jpg';
		author3.avatar = './img/antonito.jpg';
		author4.avatar = './img/miguelito.jpg';

		gallery.addAuthor(author1);
		gallery.addAuthor(author2);
		gallery.addAuthor(author3);
		gallery.addAuthor(author4);

		gallery.addImage(image1, category1, author1);
		gallery.addImage(image2, category2, author2);
		gallery.addImage(image3, category3, author3);
		gallery.addImage(image4, category4, author4);
		gallery.addImage(image5, category4, author3);
		gallery.addImage(image6, category1, author4);
		gallery.addImage(image7, category2, author1);
		gallery.addImage(image8, category3, author2);

		console.dir(gallery);
	}

	onInit = () => {
		this.#viewGallery.init();
		this.#viewGallery.showCategories(this.#modelGallery.categories);
		this.#viewGallery.bindImagesCategoryList(
			this.handleImagesCategoryList
		);
		this.#viewGallery.showAuthors(this.#modelGallery.authors);
		this.#viewGallery.bindImagesAuthorList(
			this.handleImagesAuthorList
		);
	}

	onLoad = () => {
		this.#loadGalleryObjects();
		this.#viewGallery.showImagesTypes();
		this.onAddCategory();

		this.#viewGallery.bindInit(this.handleInit);
		this.#viewGallery.bindImagesTypeList(this.handleImagesTypeList);
	}

	onAddCategory = () => {
		// this.#viewGallery.showCategoriesInMenu(this.#modelGallery.categories);
		this.#viewGallery.showImagesTypesInMenu();
	}

	onAddAuthor = () => {
		this.#viewGallery.showAuthorsInMenu(this.#modelGallery.authors);
	}

	handleInit = () => {
		this.onInit();
	}


	handleImagesCategoryList = (title) => {
		let category = this.#modelGallery.getCategory(title);
		this.#viewGallery.listImages(this.#modelGallery.getCategoryImages(category), category.title);
		// this.#viewGallery.bindImagesCategoryList(this.handleShowImage);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleImagesAuthorList = (nickname) => {
		let author = this.#modelGallery.getAuthor(nickname);
		this.#viewGallery.listAuthorImages(this.#modelGallery.getAuthorImages(author), author.nickname);
		this.#viewGallery.bindShowImage(this.handleShowImage);
		// this.#viewGallery.bindImagesAuthorList(this.handleShowImage);
	}

	handleImagesTypeList = (type) => {
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}
		console.log(type);
		if (instance[type]) {
			this.#viewGallery.listImages(this.#modelGallery.getTypeImages(instance[type]), type);
			this.#viewGallery.bindShowImage(this.handleShowImage);
		} else {
			throw new Error(`${type} isn't a type of Image.`)
		}
	}

	handleShowImage = (title) => {
		try {
			let image = this.#modelGallery.getImage(title);
			this.#viewGallery.showImage(image);
		} catch (error) {
			this.#viewGallery.showImage(null, 'No existe esta imagen en la página.');
		}
	}


}

$(function () {
	const GalleryApp = new GalleryController(
		Gallery.getInstance(), new GalleryView());
});
