"use strict";

class GalleryView {

	constructor() {
		this.main = $('main');
		this.linkShoppingcart = $('#shoppingcart');
		this.categories = $('#categories');
		this.authors = $('#authors');
		this.menu = $('.navbar-nav');
		this.imageWindow = null;
	}

	// Métodos generadores de vistas

	init() {
		this.main.empty();
		this.categories.empty();
		this.authors.empty();
	}

	showImagesTypes() {
		this.categories.empty();
		this.categories.append(`<div id="type-list" class="row">
		<div class="col-lg-3 col-md-6"><a data-type="Portrait" href="#product-list">
		<div class="cat-listimage"><img alt="Categoría Portraits" src="https://via.placeholder.com/258x172.jpg?text=Portraits" />
		</div>
		<div class="cat-list-text">
		<h3>Portraits</h3>
		</div>
		</a>
		</div>
		<div class="col-lg-3 col-md-6"><a data-type="Landscape" href="#product-list">
		<div class="cat-listimage"><img alt="Categoría Landscapes" src="https://via.placeholder.com/258x172.jpg?text=Landscapes" />
		</div>
		<div class="cat-list-text">
		<h3>Landscapes</h3>
		</div>
		</a>
		</div>
		<div class="col-lg-3 col-md-6"><a data-type="Default" href="#productlist">
		<div class="cat-listimage"><img alt="Categoría Defaults" src="https://via.placeholder.com/258x172.jpg?text=Defaults" />
		</div>
		<div class="cat-list-text">
		<h3>Defaults</h3>
		</a>
		</div>
		</div>`);
	}

	showCategories(categories) {
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $('<div id="category-list" class="row"></div>');
		let category = categories.next();
		while (!category.done) {
			container.append(`<div class="col-lg-3 col-md-6"><a data-category="${category.value.title}" href="#product-list">
		<div class="cat-listimage"><img alt="${category.value.title}" src="${category.value.url}" /></div>
		<div class="cat-list-text">
		<h3>${category.value.title}</h3>
		<div>${category.value.description}</div>
		</div>
		</a>
		</div>`);
			category = categories.next();
		}
		this.categories.append(container);
	}

	showAuthors(authors) {
		if (this.authors.children().length > 1)
			this.authors.children()[1].remove();
		let container = $('<div id="author-list" class="row"></div>');
		let author = authors.next();
		while (!author.done) {
			container.append(`<div class="col-lg-3 col-md-6"><a data-category="${author.value.nickname}" href="#product-list">
		<div class="cat-listimage"><img alt="${author.value.nickname}" src="${author.value.avatar}" /></div>
		<div class="cat-list-text">
		<h3>${author.value.nickname}</h3>
		<div>${author.value.email}</div>
		</div>
		</a>
		</div>`);
			author = authors.next();
		}
		this.authors.append(container);
	}

	showImagesTypesInMenu() {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
				Imágenes
				</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
		container.append(`<a data-category="Portrait" class="dropdown-item" href="#productlist">Portrait</a>
											<a data-category="Landscape" class="dropdown-item" href="#productlist">Landscape</a>
											<a data-category="Default" class="dropdown-item" href="#productlist">Default</a>`);
		li.append(container);
		this.menu.append(li);
	}

	showCategoriesInMenu(categories) {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
				Categorías
				</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
		let category = categories.next();
		while (!category.done) {
			container.append(`<a data-category="${category.value.title}" class="dropdown-item" href="#productlist">${category.value.title}</a>`);
			category = categories.next();
		}
		li.append(container);
		this.menu.append(li);
	}

	showAuthorsInMenu(authors) {
		let li = $(`<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown"
			aria-haspopup="true" aria-expanded="false">
				Autores
				</a>
		</li>`);
		let container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
		let author = authors.next();
		while (!author.done) {
			container.append(`<a data-category="${author.value.nickname}" class="dropdown-item" href="#productlist">${author.value.nickname}</a>`);
			author = authors.next();
		}
		li.append(container);
		this.menu.append(li);
	}

	showImage(image, message) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container;
		if (image) {
			container = $(`<div id="single-image" class="${image.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-6">
									<div class="images p-3">
										<div class="text-center p-4"> <img id="main-image" src="${image.image.url}"/></div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="product p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${image.image.title}</span>
											<h6 class="text-uppercase">${image.author}</h6>
												<div class="price d-flex flex-row align-items-center">
												</div>
										</div>
										<p class="about">${image.image.constructor.name}</p>
										<div class="sizes mt-5">
										</div>
										<div class="cart mt-4 align-items-center">
											<button id="b-open" data-serial="${image.image.title}" class="btn btn-primary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);

			container.find('h6').after(this.#instance[image.constructor.name]);

		} else {
			container = $(`<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`)
		}
		this.main.append(container);
	}

	showImageInNewWindow(image, message){
		let main = $(this.imageWindow.document).find('main');
		let header = $(this.imageWindow.document).find('header nav');
		main.empty();
		header.empty();
		let container;
		if (image){
			this.imageWindow.document.title = `${image.image.title} - ${image.author}`;
			header.append(`<h1 data-serial="${image.image.title}" class="display-5">${image.image.title} - ${image.author}</h1>`);
			container = $(`<div id="single-product" class="${image.image.constructor.name}-style container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					<div class="col-md-10">
						<div class="card">
							<div class="row">
								<div class="col-md-12">
									<div class="images p-3">
										<div class="text-center p-4"> <img id="main-image" src="${image.image.url}"/> </div>
									</div>
								</div>
								<div class="col-md-12">
									<div class="product p-4">
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${image.image.constructor.name}</span>
											<h5 class="text-uppercase">${image.image.title}</h5>
										</div>
										<p class="about">${image.author}</p>
										<div class="sizes mt-5">
											<h6 class="text-uppercase">Características</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>`);

			container.find('h6').after(this.#instance[image.constructor.name]);

		} else {
			container = $(`	<div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
		}
		main.append(container);
		this.imageWindow.document.body.scrollIntoView();
	}

	listImages(images, title) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="product-list" class="container my3"><div class="row"> </div></div>`);
		let image = images.next();
		while (!image.done) {
			let div = $(`<div class="col-md-4">
		<figure class="card card-product-grid card-lg"> <a data-serial="${image.value.image.title}" href="#single-product" class="img-wrap"><img class="${image.value.constructor.name}-
	 	style" src="${image.value.image.url}"></a>
		<figcaption class="info-wrap">
		<div class="row">
		<div class="col-md-8"> <a data-serial="${image.value.image.title}" href="#single-product" class="title">${image.value.image.title}</a> </div>
		<div class="col-md-4">${image.value.author}
		</div>
		</div>
		</figcaption>
		<div class="price-wrap"><span class="price h8">${image.value.image.constructor.name}</span></div>
		</div>
		</figure>
		</div>`);
			container.children().first().append(div);
			image = images.next();
		}
		container.prepend(`<h1>${title}</h1>`);
		this.main.append(container);
	}

	listAuthorImages(images, title) {
		this.main.empty();
		if (this.authors.children().length > 1)
			this.authors.children()[1].remove();
		let container = $(`<div id="product-list" class="container my3"><div class="row"> </div></div>`);
		let image = images.next();
		while (!image.done) {
			let div = $(`<div class="col-md-4">
		<figure class="card card-product-grid card-lg"> <a data-serial="${image.value.image.title}" href="#single-product" class="img-wrap"><img class="${image.value.constructor.name}-
	 	style" src="${image.value.image.url}"></a>
		<figcaption class="info-wrap">
		<div class="row">
		<div class="col-md-8"> <a data-serial="${image.value.image.title}" href="#single-product" class="title">${image.value.image.title}</a> </div>
		<div class="col-md-4">${image.value.author}
		</div>
		</div>
		</figcaption>
		<div class="price-wrap"><span class="price h8">${image.value.image.constructor.name}</span></div>
		</div>
		</figure>
		</div>`);
			container.children().first().append(div);
			image = images.next();
		}
		container.prepend(`<h1>${title}</h1>`);
		this.main.append(container);
	}

	#instance = {
		Portrait: this.#PortraitCharacteristics,
		Landscape: this.#LandscapeCharacteristics,
		Default: this.#DefaultCharacteristics,
	}

	#PortraitCharacteristics(image) {
		return $('<div>Características de portrait.</div>');
	}
	#LandscapeCharacteristics(image) {
		return $('<div>Características de landscape.</div>');
	}
	#DefaultCharacteristics(image) {
		return $('<div>Características de default.</div>');
	}

	#executeHandler(handler, handlerArgument, scrollElement, data, url, event){
		handler(...handlerArgument);
		$(scrollElement).get(0).scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	// Métodos de enlace con Manejadores del Controlador

	bindInit(handler) {
		$('#init').click((event) => {
			this.#executeHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});
		$('#logo').click((event) => {
			this.#executeHandler(handler, [], 'body', {action: 'init'}, '#', event);
		});
	}

	bindImagesCategoryList(handler) {
		$('#category-list').find('a').click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
				handler, [category],
				'#product-list',
				{action: 'productsCategoryList', category: category},
				'#category-list', event
			);
		});
	}

	bindImagesAuthorList(handler) {
		$('#author-list').find('a').click((event) => {
			let author = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
				handler, [author],
				'#product-list',
				{action: 'productsCategoryList', author: author},
				'#category-list', event
			);
		});
	}

	bindImagesTypeList(handler) {
		$('#type-list').find('a').click((event) => {
			let type = $(event.target).closest($('a')).get(0).dataset.type;
			this.#executeHandler(
				handler, [type],
				'#product-list',
				{action: 'productsTypeList', type: type},
				'#type-list', event
			);
		});
	}

	bindShowImage(handler) {
		$('#product-list').find('a.img-wrap').click((event) => {
			let serial = $(event.target).closest($('a')).get(0).dataset.serial;
			this.#executeHandler(
				handler, [serial],
				'#single-product',
				{action: 'showProduct', serial: serial},
				'#single-product', event
			);
		});
		$('#product-list').find('figcaption a').click((event) => {
			this.#executeHandler(
				handler, [event.target.dataset.serial],
				'#single-product',
				{action: 'showProduct', serial: event.target.dataset.serial},
				'#product-list', event
			);
		});
	}

	bindImagesCategoryInMenuList(handler){
		$('#navCats').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
			handler, [category],
			'#product-list',
			{action: 'productsCategoryList', category: category},
			'#category-list', event
			);
		});
	}

	bindShowImageInNewWindow(handler){
		$('#b-open').click((event) => {
			if (!this.imageWindow || this.imageWindow.closed){
				this.imageWindow = window.open("image.html", "ImageWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
				this.imageWindow.addEventListener('DOMContentLoaded', () => {
					handler(event.target.dataset.serial)
				});
			} else {
				if ($(this.imageWindow.document).find('header nav h1').get(0).dataset.serial !== event.target.dataset.serial){
					handler(event.target.dataset.serial);
				}
				this.imageWindow.focus();
			}
		});
	}

}
