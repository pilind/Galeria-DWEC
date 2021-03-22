"use strict";

class GalleryController {
	#modelGallery;
	#viewGallery;
	gallery = 1;

	constructor(modelGallery, viewGallery) {
		this.#modelGallery = modelGallery;
		this.#viewGallery = viewGallery;


		this.onLoad();
		this.onInit();

	}

	dataLoad = (load) => {
		const xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let datos = JSON.parse(this.responseText);
				console.log(datos);

				load(datos);

			}
		}

		xhttp.open('GET', '../js/gallery/gallery.json', true);
		xhttp.send();
	}


	loadGalleryObjects = (datos) => {
		let category1 = new Category(datos[0].category.title, datos[0].category.url);
		let category2 = new Category(datos[1].category.title, datos[1].category.url);
		let category3 = new Category(datos[2].category.title, datos[2].category.url);
		let category4 = new Category(datos[3].category.title, datos[3].category.url);

		category1.description = datos[0].category.description;
		category2.description = datos[1].category.description;
		category3.description = datos[2].category.description;
		category4.description = datos[3].category.description;

		let gallery = this.#modelGallery;
		gallery.addCategory(category1);
		gallery.addCategory(category2);
		gallery.addCategory(category3);
		gallery.addCategory(category4);

		let image1 = new Default(datos[0].images[0].image.title, datos[0].images[0].image.url);
		let image2 = new Default(datos[1].images[0].image.title, datos[1].images[0].image.url);
		let image3 = new Default(datos[2].images[0].image.title, datos[2].images[0].image.url);
		let image4 = new Default(datos[3].images[0].image.title, datos[3].images[0].image.url);
		let image5 = new Portrait(datos[3].images[1].image.title, datos[3].images[1].image.url);
		let image6 = new Landscape(datos[0].images[1].image.title, datos[0].images[1].image.url);
		let image7 = new Landscape(datos[1].images[1].image.title, datos[1].images[1].image.url);
		let image8 = new Portrait(datos[2].images[1].image.title, datos[2].images[1].image.url);

		let author1 = new Author(datos[4].authors[0].nickname, datos[4].authors[0].email);
		let author2 = new Author(datos[4].authors[1].nickname, datos[4].authors[1].email);
		let author3 = new Author(datos[4].authors[2].nickname, datos[4].authors[2].email);
		let author4 = new Author(datos[4].authors[3].nickname, datos[4].authors[3].email);

		author1.avatar = datos[4].authors[0].avatar;
		author2.avatar = datos[4].authors[1].avatar;
		author3.avatar = datos[4].authors[2].avatar;
		author4.avatar = datos[4].authors[3].avatar;

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
		// console.log(JSON.stringify(datos));
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
		this.onAddCategory();


	}

	onLoad = () => {
		this.dataLoad(this.loadGalleryObjects);
		this.#viewGallery.showCategories(this.#modelGallery.categories);


		//Enlazamos handlers con la vista
		this.#viewGallery.bindInit(this.handleInit);
		this.#viewGallery.bindImagesCategoryInMenuList(this.handleImagesCategoryList);

		if (document.cookie !== "") {
			this.#viewGallery.showAdminMenu();
			this.#viewGallery.bindAdminMenu(
				this.handleNewCategoryForm,
				this.handleRemoveCategoryForm,
				this.handleNewProductForm,
				this.handleRemoveProductForm,
				this.handleNewAuthorForm,
				this.handleRemoveAuthorForm,
				this.handleInit
			);
			this.#viewGallery.showFavMenu();
			this.#viewGallery.bindFavMenu(
				this.handleNewFavImageForm,
				this.handleRemoveFavImageForm
			)
		}

	}

	onAddCategory = () => {
		this.#viewGallery.showCategoriesInMenu(this.#modelGallery.categories);
		this.#viewGallery.bindImagesCategoryInMenuList(this.handleImagesCategoryList);
	}



	onAddAuthor = () => {
		this.#viewGallery.showAuthorsInMenu(this.#modelGallery.authors);
	}

	onAddImage = () => {
		this.#viewGallery.showImagesTypesInMenu();
		this.#viewGallery.bindImagesTypeList(this.handleImagesTypeList);

	}

	//Manejadores para la gestión de peticiones de la Vista
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

	handleNewFavImageForm = () => {
		this.#viewGallery.showNewFavImageForm(this.#modelGallery.categories);
		this.#viewGallery.bindAddFavImagesSelect(this.handleAddFavImageListByType, this.handleAddFavImageListByCategory);
	}

	handleRemoveProductListByType = (type) => {
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}
		this.#viewGallery.showRemoveProductList(this.#modelGallery.getTypeImages(instance[type]));
		this.#viewGallery.bindRemoveProduct(this.handleRemoveProduct);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleRemoveProductListByCategory = (category) => {
		let cat = this.#modelGallery.getCategory(category);
		this.#viewGallery.showRemoveProductList(this.#modelGallery.getCategoryImages(cat));
		this.#viewGallery.bindRemoveProduct(this.handleRemoveProduct);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleAddFavImageListByType = (type) => {
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}
		this.#viewGallery.showAddFavImagesList(this.#modelGallery.getTypeImages(instance[type]));
		this.#viewGallery.bindAddFavImages(this.handleAddFavImage);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleAddFavImageListByCategory = (category) => {
		let cat = this.#modelGallery.getCategory(category);
		this.#viewGallery.showAddFavImagesList(this.#modelGallery.getCategoryImages(cat));
		this.#viewGallery.bindAddFavImages(this.handleAddFavImage);
		this.#viewGallery.bindShowImage(this.handleShowImage);
	}

	handleCreateCategory = (title, url, desc) => {
		let cat = new Category(title, url);
		cat.description = desc;
		console.log(cat);
		let done, error;
		try {
			this.#modelGallery.addCategory(cat);
			done = true;
			this.onAddCategory();
		} catch (exception) {
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
			// this.onAddAuthor();
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showNewAuthorModal(done, author, error);
	}

	handleCreateProduct = (titleI, type, url, desc, categories, authors) => {
		let instance = {
			Portrait: Portrait,
			Landscape: Landscape,
			Default: Default,
		}

		let done, error, image;

		try {
				let author = authors.forEach(nickname => {
				author = this.#modelGallery.getAuthor(nickname);
			});
			alert(author);

			image = new instance[type](titleI, url);

			console.log(author);
			console.log(image);

			image.description = desc;

			// this.#modelGallery.addImage(image);
			categories.forEach(title => {
				let category = this.#modelGallery.getCategory(title);
				console.log(category);
				this.#modelGallery.addImage(image, category, author);
			});
			done = true;
		} catch (exception) {
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
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveCategoryModal(done, cat, position, error);
	}

	handleRemoveProduct = (title, position) => {
		let done, error, image;
		try {
			image = this.#modelGallery.getImage(title);
			this.#modelGallery.removeImage(image.image);
			done = true;
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveProductModal(done, image, position, error);
	}

	handleAddFavImage = (title, position) => {
		let done, error, image;
		try {
			image = this.#modelGallery.getImage(title);
			localStorage.setItem(img, image);
			done = true;
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showAddFavImageModal(done, image, position, error);
	}


	handleRemoveAuthor = (nickname, position) => {
		let done, error, author;
		try {
			author = this.#modelGallery.getAuthor(nickname);
			this.#modelGallery.removeAuthor(author);
			done = true;
		} catch (exception) {
			done = false;
			error = exception;
		}
		this.#viewGallery.showRemoveAuthorModal(done, author, position, error);
	}


}

$(function () {
	const GalleryApp = new GalleryController(
		Gallery.getInstance(), new GalleryView());

	history.replaceState({ action: 'init' }, null);
	window.addEventListener('popstate', function (event) {
		if (event.state) {
			switch (event.state.action) {
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
				case 'newFavImage':
					GalleryApp.handleNewFavImageForm();
					break;
			}
		}
	});
});
