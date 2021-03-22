"use strict";

class GalleryView {

	constructor() {
		this.main = $('main');
		this.linkShoppingcart = $('#shoppingcart');
		this.categories = $('#categories');
		this.authors = $('#authors');
		this.menu = $('.navbar-nav');
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

	// Métodos de enlace con Manejadores del Controlador

	bindInit(handler) {
		$('#init').click((event) => {
			handler();
		});
		$('#logo').click((event) => {
			handler();
		});
	}

	bindImagesCategoryList(handler) {
		$('#navCats').next().children().click(function (event) {
			handler(this.dataset.category);
		});
		$('#category-list').find('a').click(function (event) {
			handler(this.dataset.category);
		});
	}

	bindImagesAuthorList(handler) {
		$('#author-list').find('a').click(function (event) {
			handler(this.dataset.category);
		});
	}

	bindImagesTypeList(handler) {
		$('#type-list').find('a').click(function (event) {
			handler(this.dataset.type);
		})
	}

	bindShowImage(handler) {
		$('#product-list').find('a.img-wrap').click(function (event) {
			handler(this.dataset.serial);
		});
		$('#product-list').find('figcaption a').click(function (event) {
			handler(this.dataset.serial);
		});
	}



}
