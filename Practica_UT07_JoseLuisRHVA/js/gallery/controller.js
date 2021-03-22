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

		//Enlazamos handlers con la vista
		this.#viewGallery.bindInit(this.handleInit);
		this.#viewGallery.bindImagesTypeList(this.handleImagesTypeList);
		// this.#viewGallery.bindImagesCategoryInMenuList(this.handleImagesCategoryList);
		this.#viewGallery.showAdminMenu();
		this.#viewGallery.bindAdminMenu(
			this.handleNewCategoryForm,
			this.handleRemoveCategoryForm,
			this.handleNewProductForm,
			this.handleRemoveProductForm,
			this.handleNewAuthorForm,
			this.handleRemoveAuthorForm
			);
	}

	onAddCategory = () => {
		this.#viewGallery.showCategoriesInMenu(this.#modelGallery.categories);
		// this.#viewGallery.showImagesTypesInMenu();
		this.#viewGallery.bindImagesCategoryInMenuList(this.handleImagesCategoryList);
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
			this.#viewGallery.bindShowImageInNewWindow(this.handleShowImageInNewWindow);
		} catch (error) {
			this.#viewGallery.showImage(null, 'No existe esta imagen en la página.');
		}
	}

	handleShowImageInNewWindow = (title) => {
		try {
			let image = this.#modelGallery.getImage(title);
			this.#viewGallery.showImageInNewWindow(image);
		} catch (error) {
			this.#viewGallery.showImageInNewWindow(null, 'No existe esta imagen en la página.');
		}
	}

	handleNewCategoryForm = () => {
		this.#viewGallery.showNewCategoryForm();
		this.#viewGallery.bindNewCategoryForm(this.handleCreateCategory);
	}

	handleNewProductForm = () => {
		this.#viewGallery.showNewProductForm(this.#modelGallery.categories, this.#modelGallery.authors);
		this.#viewGallery.bindNewProductForm(this.handleCreateProduct);
	}

	handleNewAuthorForm = () => {
		this.#viewGallery.showNewAuthorForm();
		this.#viewGallery.bindNewAuthorForm(this.handleCreateAuthor);
	}

	handleRemoveProductForm = () => {
		this.#viewGallery.showRemoveProductForm(this.#modelGallery.categories);
		this.#viewGallery.bindRemoveProductSelects(this.handleRemoveProductListByType, this.handleRemoveProductListByCategory);
	}

	handleRemoveCategoryForm = () => {
		this.#viewGallery.showRemoveCategoryForm(this.#modelGallery.categories);
		this.#viewGallery.bindRemoveCategoryForm(this.handleRemoveCategory);
	}

	handleRemoveAuthorForm = () => {
		this.#viewGallery.showRemoveAuthorForm(this.#modelGallery.authors);
		this.#viewGallery.bindRemoveAuthorForm(this.handleRemoveAuthor);
	}

	handleRemoveProductListByType = (type) => {
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}
		this.#viewGallery.showRemoveProductList (this.#modelGallery.getTypeImages(instance[type]));
		this.#viewGallery.bindRemoveProduct(this.handleRemoveProduct);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleRemoveProductListByCategory = (category) => {
		let cat = this.#modelGallery.getCategory(category);
		this.#viewGallery.showRemoveProductList(this.#modelGallery.getCategoryImages(cat));
		this.#viewGallery.bindRemoveProduct(this.handleRemoveProduct);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleCreateCategory = (title, url, desc) => {
		let cat = new Category(title, url);
		cat.description = desc;
		console.log(cat);
		let done, error;
		try{
			this.#modelGallery.addCategory(cat);
			done = true;
			this.onAddCategory();
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewGallery.showNewCategoryModal(done, cat, error);
	}

	handleCreateAuthor = (email, nickname, avatar) => {
		let author = new Author(nickname, email);
		author.avatar = avatar;

		let done, error;
		try {
			this.#modelGallery.addAuthor(author);
			done = true;
			this.onAddAuthor();
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showNewAuthorModal(done, author, error);
	}

	handleCreateProduct = (titleI, type, url, desc, authors, categories) => {
		console.log("ENTRA");
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}
		let done, error, image, author;

		try{
			author = authors.forEach(nickname => {
				author = this.#modelGallery.getAuthor(nickname);
			});
			image = new instance[type](titleI, url);
			console.log(author);
			// image = {
			// 	image: new instance[type](titleI, url),
			// };
			console.log(image);
			image.description = desc;
			// this.#modelGallery.addImage(image);
			categories.forEach(title => {
				let category = this.#modelGallery.getCategory(title);
				console.log(category);
				this.#modelGallery.addImage(image,category, author);
			});
			done = true;
		} catch(exception){
			done = false;
			error = exception;
		}

		this.#viewGallery.showNewProductModal(done, image, error);
	}



	handleRemoveCategory = (title, position) => {
		let done, error, cat;
		try {
			cat = this.#modelGallery.getCategory(title);
			this.#modelGallery.removeCategory(cat);
			done = true;
			this.onAddCategory();
		} catch(exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveCategoryModal(done, cat, position, error);
	}

	handleRemoveProduct = (title, position) => {
		let done, error, image;
		try{
			image = this.#modelGallery.getImage(title);
			this.#modelGallery.removeImage(image);
			done = true;
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveProductModal(done, image, position, error);
	}


	handleRemoveAuthor = (nickname, position) => {
		let done, error, author;
		try{
			author = this.#modelGallery.getAuthor(nickname);
			this.#modelGallery.removeAuthor(author);
			done = true;
		} catch(exception){
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveAuthorModal(done, author, position, error);
	}


}

$(function () {
	const GalleryApp = new GalleryController(
		Gallery.getInstance(), new GalleryView());
		history.replaceState({action: 'init'}, null);

		history.replaceState({action: 'init'}, null);
		window.addEventListener('popstate', function(event) {
			if (event.state){
				switch (event.state.action){
					case 'init':
						GalleryApp.handleInit();
						break;
					case 'imagesCategoryList':
						GalleryApp.handleImagesCategoryList(event.state.category);
						break;
					case 'imagesTypeList':
						GalleryApp.handleImagesTypeList(event.state.type);
						break;
					case 'showImage':
						GalleryApp.handleShowImage(event.state.serial);
						break;
					case 'newCategory':
						GalleryApp.handleNewCategoryForm();
					case 'removeCategory':
						GalleryApp.handleRemoveCategoryForm();
						break;
					case 'newProduct':
						GalleryApp.handleNewProductForm();
						break;
					case 'removeProduct':
						GalleryApp.handleRemoveProductForm();
						break;
					case 'removeProductByType':
						GalleryApp.handleRemoveProductForm();
						GalleryApp.handleRemoveProductListByType(event.state.type);
						break;
					case 'removeProductByCategory':
						GalleryApp.handleRemoveProductForm();
						GalleryApp.handleRemoveProductListByCategory(event.state.category);
						break;
					case 'newAuthor':
						GalleryApp.handleNewAuthorForm();
						break;
					case 'removeAuthor':
						GalleryApp.handleRemoveAuthorForm();
						break;
				}
			}
		});
});
