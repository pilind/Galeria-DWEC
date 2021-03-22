"use strict";

class GalleryView {

	constructor() {
		this.main = $('main');
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
		let link = $('#navCats');
		let container;
		if (link.length === 1) {
			container = link.next();
			container.children().remove();
			link.parent().append(container);
		} else {
			container = $('<div class="dropdown-menu" aria-labelledby="navCats"></div>');
			let li = $(`<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" id="navCats" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Categorías
				</a>
			</li>`);
			li.append(container);
			this.menu.append(li);
		}

		let category = categories.next();
		while (!category.done) {
			container.append(`<a data-category="${category.value.title}" class="dropdown-item" href="#product-list">${category.value.title}</a>`);
			category = categories.next();
		}
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

	showImageInNewWindow(image, message) {
		let main = $(this.imageWindow.document).find('main');
		let header = $(this.imageWindow.document).find('header nav');
		main.empty();
		header.empty();
		let container;
		if (image) {
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

	#executeHandler(handler, handlerArguments, scrollElement, data, url, event) {
		handler(...handlerArguments);
		$(scrollElement).get(0).scrollIntoView();
		history.pushState(data, null, url);
		event.preventDefault();
	}

	// Vistas formularios

	showAdminMenu() {
		let li = $(`<li class="nav-item dropdown" id="adminMenu">
			<a class="nav-link dropdown-toggle" href="#" id="navAdmin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				Administración
			</a>
		</li>`);
		let container = $(`<div class="dropdown-menu" aria-labelledby="navAdmin">
			<a id="lnewCategory" class="dropdown-item" href="#new-category">Crear categoría</a>
			<a id="ldelCategory" class="dropdown-item" href="#new-category">Eliminar categoría</a>
			<a id="lnewImage" class="dropdown-item" href="#new-category">Crear imagen</a>
			<a id="ldelImage" class="dropdown-item" href="#new-category">Eliminar imagen</a>
			<a id="lnewAuthor" class="dropdown-item" href="#new-category">Crear autor</a>
			<a id="ldelAuthor" class="dropdown-item" href="#new-category">Eliminar autor</a>
			<a id="lObjects" class="dropdown-item" href="#new-category">Generar objetos</a>
		</div>`);
			li.append(container);
			this.menu.append(li);

	}

	showFavMenu() {
		let li = $(`<li class="nav-item dropdown" id="adminMenu">
			<a class="nav-link dropdown-toggle" href="#" id="navFav" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				 Favoritos
			</a>
		</li>`);
		let container = $(`<div class="dropdown-menu" aria-labelledby="navFav">
		<a id="lnewFavImage" class="dropdown-item" href="#new-category">Elegir imagen favorita</a>
		<a id="ldelFavImage" class="dropdown-item" href="#new-category">Eliminar imagen favorita</a>
		</div>`);
		li.append(container);
		this.menu.append(li);
	}

	// showNewFavImageForm(categories) {
	// 	this.main.empty();
	// 	if (this.categories.children().length > 1)
	// 		this.categories.children()[1].remove();
	// 	let container = $(`<div id="add-fav" class="container my-3">
	// 		<h1 class="display-5">Añadir una imagen favorita</h1>
	// 			<div class="form-row">
	// 				<div class="col-md-6 mb-3">
	// 					<label for="ncTitle">Tipos de imagen</label>
	// 					<div class="input-group">
	// 						<div class="input-group-prepend">
	// 							<span class="input-group-text" id="typePrepend"><i class="fas fa-list-alt"></i></span>
	// 						</div>
	// 						<select class="custom-select" id="fiType" name="fiType" aria-describedby="typePrepend">
	// 							<option disabled selected>Selecciona un tipo</option>
	// 							<option value="Portrait">Portrait</option>
	// 							<option value="Landscape">Landscape</option>
	// 							<option value="Default">Default</option>
	// 						</select>
	// 					</div>
	// 				</div>
	// 				<div class="col-md-6 mb-3">
	// 					<label for="ncUrl">Categorías</label>
	// 					<div class="input-group">
	// 						<div class="input-group-prepend">
	// 							<span class="input-group-text" id="categoryPrepend"><i
	// 									class="fas fa-list-alt"></i></span>
	// 						</div>
	// 						<select class="custom-select" id="fiCategories" name="fiCategories" aria-describedby="categoryPrepend">
	// 							<option disabled selected>Selecciona una categoría</option>
	// 						</select>
	// 					</div>
	// 				</div>
	// 			</div>
	// 			<div id="product-list" class="container my-3"><div class="row"></div></div>
	// 	</div>`);
	// 	let categoriesSelect = container.find('#fiCategories');
	// 	let category = categories.next();
	// 	while (!category.done){
	// 		categoriesSelect.append(`<option value="${category.value.title}">${category.value.title}</option>`);
	// 		category = categories.next();
	// 	}
	// 	this.categories.append(container);

	// 	this.main.append(container);
	// }

	showAddFavImagesList(images) {
		let listContainer = $('#images-list div.row');
		listContainer.empty();

		let image = images.next();
		if (image.done){
			listContainer.append($('<p class="text-danger"><i class="fas fa-exclamation-circle"></i> No existen imagenes para esta categoría o tipo.</p>'));
		}
		while (!image.done){
			let div = $(`<div class="col-md-4 fiImage">
				<figure class="card card-product-grid card-lg"> <a data-serial="${image.value.image.title}" href="#single-image" class="img-wrap"><img class="${image.value.constructor.name}-style" src="${image.value.image.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${image.value.image.title}" href="#single-image" class="title">${image.value.image.title} - ${image.value.author}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${image.value.image.title}" class="btn btn-primary float-right"> Añadir </a>
					</div>
				</figure>
			</div>`);
			listContainer.append(div);
			image = images.next();
		}
	}

	showAddFavImageModal(done, image, position, error) {
		$('#fav-image').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="addFavImageModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="addFavImageModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="addFavImageModalLabel">Imagen eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La imagen <strong>${image.title} - ${image.author}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let addFavImageModal = $('#addFavImageModal');
			addFavImageModal.modal('show');
			addFavImageModal.find('button').click(() => {
				addFavImageModal.on('hidden.bs.modal', function (event) {
						this.remove();
				});
				addFavImageModal.modal('hide');
				position++;
				let divCat = $('#image-list').find(`div.rProduct:nth-child(${position})`);
				divCat.remove();
			})
		} else {
			$('#fav-image').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La imagen <strong>${image.title}</strong> no exite en la Galeria.</div>`);
		}
	}

	showNewCategoryForm() {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();

		let container = $(`<div id="new-category" class="container my-3">
				<h1 class="display-5">Nueva categoría</h1>
				<form name="fNewCategory" role="form" novalidate>
					<div class="form-row">
						<div class="col-md-6 mb-3">
							<label for="ncTitle">Título *</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="titlePrepend"><i class="fas fa-heading"></i></span>
								</div>
								<input type="text" class="form-control" id="ncTitle" name="ncTitle" placeholder="Título de categoría"
									aria-describedby="titlePrepend" value="" required>
								<div class="invalid-feedback">El título es obligatorio.</div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
						<div class="col-md-6 mb-3">
							<label for="ncUrl">URL *</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="urlPrepend"><i
											class="fas fa-image"></i></span>
								</div>
								<input type="url" class="form-control" id="ncUrl" name="ncUrl" placeholder="http://www.test.es"
									aria-describedby="urlPrepend" value="" required>
								<div class="invalid-feedback">La URL no es válida.</div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="col-md-12 mb-3">
							<label for="ncDescription">Descripción</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="descPrepend"><i class="fas fa-align-left"></i></span>
								</div>
								<input type="text" class="form-control" id="ncDescription" name="ncDescription"
									aria-describedby="descPrepend" value="" required>
								<div class="invalid-feedback"></div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
					</div>

					<button class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</form>
			</div>
		</div>`);

		this.main.append(container);
	}

	showNewCategoryModal(done, cat, error) {
		$(document.fNewCategory).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${cat.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newCategoryModal = $('#newCategoryModal');
			newCategoryModal.modal('show');
			newCategoryModal.find('button').click(() => {
				newCategoryModal.on('hidden.bs.modal', function (event) {
					document.fNewCategory.reset();
					document.fNewCategory.ncTitle.focus();
					this.remove();
				});
				newCategoryModal.modal('hide');
			})
		} else {
			$(document.fNewCategory).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.</div>`);
		}
	}

	showRemoveCategoryForm(categories) {
		this.main.empty();
		this.categories.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="remove-category" class="container my-3">
			<h1 class="display-5">Eliminar una categoría categoría</h1>
			<div id="category-list" class="row"></div>
			</div>`);

		let category = categories.next();
		while (!category.done) {
			container.children().nextAll('div').append(`<div class="cat col-lg-3 col-md-6"><a data-category="${category.value.title}" href="#product-list">
					<div class="cat-list-image"><img alt="${category.value.title}" src="${category.value.url}" />
					</div>
					<div class="cat-list-text">
						<h3>${category.value.title}</h3>
						<div><button class="btn btn-primary" data-category="${category.value.title}" type='button'>Eliminar</button></div>
					</div>
				</a>
			</div>`);
			category = categories.next();
		}
		this.categories.append(container);

		this.main.append(container);
	}

	showRemoveCategoryModal(done, cat, position, error) {
		$('remove-category').find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="removeCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${cat.title}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeCategoryModal');
			removeCategoryModal.modal('show');
			removeCategoryModal.find('button').click(() => {
				removeCategoryModal.on('hidden.bs.modal', function (event) {
					this.remove();
				});
				removeCategoryModal.modal('hide');
				let divCat = $('#remove-category').find(`div > div:nth-child(${position + 1})`);
				divCat.remove();
			})
		} else {
			$('#removeCategoryModal').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${cat.title}</strong> no exite en el Manager.</div>`);
		}
	}

	showNewProductForm(categories, authors) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();

		let container = $(`<div id="new-product" class="container my-3">
			<h1 class="display-5">Nueva imagen</h1>
		</div>`);
		let form = $(`<form name="fNewProduct" role="form" novalidate><form>`);
		form.append(`<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="npTitle">Titulo *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="titlePrepend"><i class="fas fa-key"></i></span>
					</div>
					<input type="text" class="form-control" id="npTitle" name="npTitle" placeholder="Titulo" aria-describedby="titlePrepend" value="" required>
					<div class="invalid-feedback">El titulo es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
		form.append(`<div class="form-row">
				<div class="col-md-6 mb-3">
				<label for="npCoords">Coordenadas</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="coordsPrepend"><i class="fas fa-mobile-alt"></i></span>
					</div>
					<input type="text" class="form-control" id="npCoords" name="npCoords" placeholder="Coordenadas" aria-describedby="coordsPrepend" value="">
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);

		let selectA = $(`<select class="custom-select" id="npAuthors" name="npAuthors" aria-describedby="authorPrepend" required multiple></select>`);
		let author = authors.next();
		while (!author.done){
			selectA.append(`<option value="${author.value.nickname}">${author.value.nickname}</option>`);
			author = authors.next();
		}
		let selectContainerA = $(`<div class="form-row">
			<div class="col-md-3 mb-3">
				<label for="npAuthors">Autores *</label>
				<div class="input-group">
					<div class="input-group mb-3" id="authorsContainer">
						<div class="input-group-prepend">
							<span class="input-group-text" id="authorPrepend"><i class="fas fa-list-alt"></i></span>
						</div>
					</div>
				</div>
			</div>`);
		form.append(`<div class="form-row mb-2">
			* Tipo de imagen
		</div>
		<div class="form-row" id="cType">
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npPortraitType" value="Portrait" required>
					</div>
				</div>
				<label class="form-control" for="npPortraitType">Portrait</label>
			</div>
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npLandscapeType" value="Landscape" required>
					</div>
				</div>
				<label class="form-control" for="npLandscapeType">Landscape</label>
			</div>
			<div class="col-md-3 mb-0 input-group">
				<div class="input-group-prepend">
					<div class="input-group-text">
					<input type="radio" name="npType" id="npDefaultType" value="Default" required>
					</div>
				</div>
				<label class="form-control" for="npDefaultType">Default</label>
			</div>
			<div class="col-md-3 mb-3 mt-1 input-group">
				<div class="invalid-feedback"><i class="fas fa-times"></i> El tipo de imagen es obligatorio.</div>
				<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>
			</div>
		</div>`);
		form.append(`<div class="form-row">
			<div class="col-md-6 mb-3">
				<label for="npUrl">URL *</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="urlPrepend"><i class="fas fa-image"></i></span>
					</div>
					<input type="url" class="form-control" id="npUrl" name="npUrl" placeholder="http://www.test.es" aria-describedby="urlPrepend" value="" required>
					<div class="invalid-feedback">La URL no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);

		let select = $(`<select class="custom-select" id="npCategories" name="npCategories" aria-describedby="categoryPrepend" required multiple></select>`);
		let category = categories.next();
		while (!category.done){
			select.append(`<option value="${category.value.title}">${category.value.title}</option>`);
			category = categories.next();
		}
		let selectContainer = $(`<div class="form-row">
			<div class="col-md-3 mb-3">
				<label for="npCategories">Categorías *</label>
				<div class="input-group">
					<div class="input-group mb-3" id="categoriesContainer">
						<div class="input-group-prepend">
							<span class="input-group-text" id="categoryPrepend"><i class="fas fa-list-alt"></i></span>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-9 mb-3">
				<label for="npDescription">Descripción</label>
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="descPrepend"><i class="fas fa-align-left"></i></span>
					</div>
					<textarea class="form-control" id="npDescription" name="npDescription" aria-describedby="descPrepend" rows="4">
					</textarea>
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
		</div>`);
		selectContainer.find('#categoriesContainer').first().append(select);
		selectContainer.find('#categoriesContainer').first().append(`<div class="invalid-feedback"><i class="fas fa-times"></i> La categoria es obligatoria.</div>`);
		selectContainer.find('#categoriesContainer').first().append(`<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>`);
		form.append(selectContainer);

		selectContainerA.find('#authorsContainer').first().append(selectA);
		selectContainerA.find('#authorsContainer').first().append(`<div class="invalid-feedback"><i class="fas fa-times"></i> El autor es obligatorio.</div>`);
		selectContainerA.find('#authorsContainer').first().append(`<div class="valid-feedback"><i class="fas fa-check"></i> Correcto.</div>`);
		form.append(selectContainerA);

		form.append(`<button class="btn btn-primary m-1" type="submit">Enviar</button>`);
		form.append(`<button class="btn btn-primary m-1" type="reset">Cancelar</button>`);
		container.append(form);
		this.main.append(container);
	}

	showNewProductModal(done, image, error) {
		$(document.fNewProduct).find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Producto creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La imagen <strong>${image.title} - ${image.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			console.log(image);
			$('body').append(modal);
			let newProductModal = $('#newProductModal');
			newProductModal.modal('show');
			newProductModal.find('button').click(() => {
				newProductModal.on('hidden.bs.modal', function (event) {
					document.fNewProduct.reset();
					document.fNewProduct.npTitle.focus();
					this.remove();
				});
				newProductModal.modal('hide');
			})
		} else {
			$(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La imagen <strong>${image.title} - ${image.title}</strong> no ha podido crearse correctamente.</div>`);
		}
	}

	showRemoveProductForm(categories) {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();
		let container = $(`<div id="remove-product" class="container my-3">
			<h1 class="display-5">Eliminar una imagen</h1>
				<div class="form-row">
					<div class="col-md-6 mb-3">
						<label for="ncTitle">Tipos de imagen</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="typePrepend"><i class="fas fa-list-alt"></i></span>
							</div>
							<select class="custom-select" id="rpType" name="rpType" aria-describedby="typePrepend">
								<option disabled selected>Selecciona un tipo</option>
								<option value="Portrait">Portrait</option>
								<option value="Landscape">Landscape</option>
								<option value="Default">Default</option>
							</select>
						</div>
					</div>
					<div class="col-md-6 mb-3">
						<label for="ncUrl">Categorías</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="categoryPrepend"><i
										class="fas fa-list-alt"></i></span>
							</div>
							<select class="custom-select" id="rpCategories" name="rpCategories" aria-describedby="categoryPrepend">
								<option disabled selected>Selecciona una categoría</option>
							</select>
						</div>
					</div>
				</div>
				<div id="product-list" class="container my-3"><div class="row"></div></div>
		</div>`);

		let categoriesSelect = container.find('#rpCategories');
		let category = categories.next();
		while (!category.done){
			categoriesSelect.append(`<option value="${category.value.title}">${category.value.title}</option>`);
			category = categories.next();
		}
		this.categories.append(container);

		this.main.append(container);
	}

	showRemoveProductList(images) {
		let listContainer = $('#product-list div.row');
		listContainer.empty();

		let image = images.next();
		if (image.done){
			listContainer.append($('<p class="text-danger"><i class="fas fa-exclamation-circle"></i> No existen imagenes para esta categoría o tipo.</p>'));
		}
		while (!image.done){
			let div = $(`<div class="col-md-4 rProduct">
				<figure class="card card-product-grid card-lg"> <a data-serial="${image.value.image.title}" href="#single-product" class="img-wrap"><img class="${image.value.constructor.name}-style" src="${image.value.image.url}"></a>
					<figcaption class="info-wrap">
						<div class="row">
							<div class="col-md-8"> <a data-serial="${image.value.image.title}" href="#single-product" class="title">${image.value.image.title} - ${image.value.author}</a> </div>
							<div class="col-md-4">
								<div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
							</div>
						</div>
					</figcaption>
					<div class="bottom-wrap"> <a href="#" data-serial="${image.value.image.title}" class="btn btn-primary float-right"> Eliminar </a>
					</div>
				</figure>
			</div>`);
			listContainer.append(div);
			image = images.next();
		}
	}

	showRemoveProductModal(done, image, position, error) {
		$('#remove-product').find('div.error').remove();
		if (done){
			let modal = $(`<div class="modal fade" id="removeProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeProductModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeProductModalLabel">Imagen eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La imagen <strong>${image.image.title} - ${image.author}</strong> ha sido eliminado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeCategoryModal = $('#removeProductModal');
				removeCategoryModal.modal('show');
				removeCategoryModal.find('button').click(() => {
					removeCategoryModal.on('hidden.bs.modal', function (event) {
						this.remove();
				});
				removeCategoryModal.modal('hide');
				position++;
				let divCat = $('#product-list').find(`div.rProduct:nth-child(${position})`);
				divCat.remove();
			});
		} else {
			$('#remove-product').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La imagen <strong>${image.title}</strong> no exite en la Galeria.</div>`);
		}
	}

	showNewAuthorForm() {
		this.main.empty();
		if (this.categories.children().length > 1)
			this.categories.children()[1].remove();

		let container = $(`<div id="new-author" class="container my-3">
				<h1 class="display-5">Nuevo autor</h1>
				<form name="fNewAuthor" role="form" novalidate>
					<div class="form-row">
						<div class="col-md-6 mb-3">
							<label for="naNickname">Nickname *</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="nicknamePrepend"><i class="fas fa-heading"></i></span>
								</div>
								<input type="text" class="form-control" id="naNickname" name="naNickname" placeholder="Nickname del autor"
									aria-describedby="nicknamePrepend" value="" required>
								<div class="invalid-feedback">El nickname es obligatorio.</div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
						<div class="col-md-6 mb-3">
							<label for="naAvatar">URL</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="avatarPrepend"><i
											class="fas fa-image"></i></span>
								</div>
								<input type="url" class="form-control" id="naAvatar" name="naAvatar" placeholder="http://www.test.es"
									aria-describedby="avatarPrepend" value="">
								<div class="invalid-feedback">El avatar no es válido.</div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="col-md-12 mb-3">
							<label for="naEmail">Email *</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="descPrepend"><i class="fas fa-align-left"></i></span>
								</div>
								<input type="email" class="form-control" id="naEmail" name="naEmail" placeholder="author@test.com"
									aria-describedby="descPrepend" value="" required>
								<div class="invalid-feedback"></div>
								<div class="valid-feedback">Correcto.</div>
							</div>
						</div>
					</div>

					<button class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</form>
			</div>
		</div>`);

		this.main.append(container);
	}

	showNewAuthorModal(done, author, error) {
		$(document.fNewAuthor).find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="newAuthorModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newAuthorModalLabel">Autor creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${author.nickname}</strong> ha sido creado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let newAuthorModal = $('#newAuthorModal');
			newAuthorModal.modal('show');
			newAuthorModal.find('button').click(() => {
				newAuthorModal.on('hidden.bs.modal', function (event) {
					document.fNewAuthor.reset();
					document.fNewAuthor.naNickname.focus();
					this.remove();
				});
				newAuthorModal.modal('hide');
			})
		} else {
			$(document.fNewAuthor).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El autor <strong>${author.nickname}</strong> ya está creado.</div>`);
		}
	}

	showRemoveAuthorForm(authors) {
		this.main.empty();
		this.authors.empty();
		if (this.authors.children().length > 1)
			this.authors.children()[1].remove();
		let container = $(`<div id="remove-author" class="container my-3">
			<h1 class="display-5">Eliminar un autor</h1>
			<div id="category-list" class="row"></div>
			</div>`);

		let author = authors.next();
		while (!author.done) {
			container.children().nextAll('div').append(`<div class="cat col-lg-3 col-md-6"><a data-category="${author.value.nickname}" href="#product-list">
					<div class="cat-list-image"><img alt="${author.value.nickname}" src="${author.value.avatar}" />
					</div>
					<div class="cat-list-text">
						<h3>${author.value.nickname}</h3>
						<div><button class="btn btn-primary" data-category="${author.value.nickname}" type='button'>Eliminar</button></div>
					</div>
				</a>
			</div>`);
			author = authors.next();
		}
		this.authors.append(container);

		this.main.append(container);
	}

	showRemoveAuthorModal(done, author, position, error) {
		$('remove-author').find('div.error').remove();
		if (done) {
			let modal = $(`<div class="modal fade" id="removeAuthorModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="removeAuthorModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="removeAuthorModalLabel">Autor eliminado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							El autor <strong>${author.nickname}</strong> ha sido eliminado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
			$('body').append(modal);
			let removeAuthorModal = $('#removeAuthorModal');
			removeAuthorModal.modal('show');
			removeAuthorModal.find('button').click(() => {
				removeAuthorModal.on('hidden.bs.modal', function (event) {
					this.remove();
				});
				removeAuthorModal.modal('hide');
				let divCat = $('#remove-author').find(`div > div:nth-child(${position + 1})`);
				divCat.remove();
			})
		} else {
			$('#removeAuthorModal').prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El autor <strong>${author.nickname}</strong> no exite en la Galeria.</div>`);
		}
	}

	// Métodos de enlace con Manejadores del Controlador

	bindInit(handler) {
		$('#init').click((event) => {
			this.#executeHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
		$('#logo').click((event) => {
			this.#executeHandler(handler, [], 'body', { action: 'init' }, '#', event);
		});
	}

	bindImagesCategoryList(handler) {
		$('#category-list').find('a').click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
				handler, [category],
				'#product-list',
				{ action: 'productsCategoryList', category: category },
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
				{ action: 'productsCategoryList', author: author },
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
				{ action: 'productsTypeList', type: type },
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
				{ action: 'showProduct', serial: serial },
				'#single-product', event
			);
		});
		$('#product-list').find('figcaption a').click((event) => {
			this.#executeHandler(
				handler, [event.target.dataset.serial],
				'#single-product',
				{ action: 'showProduct', serial: event.target.dataset.serial },
				'#product-list', event
			);
		});
	}

	bindImagesCategoryInMenuList(handler) {
		$('#navCats').next().children().click((event) => {
			let category = $(event.target).closest($('a')).get(0).dataset.category;
			this.#executeHandler(
				handler, [category],
				'#product-list',
				{ action: 'productsCategoryList', category: category },
				'#category-list', event
			);
		});
	}

	bindShowImageInNewWindow(handler) {
		$('#b-open').click((event) => {
			if (!this.imageWindow || this.imageWindow.closed) {
				this.imageWindow = window.open("image.html", "ImageWindow", "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no");
				this.imageWindow.addEventListener('DOMContentLoaded', () => {
					handler(event.target.dataset.serial)
				});
			} else {
				if ($(this.imageWindow.document).find('header nav h1').get(0).dataset.serial !== event.target.dataset.serial) {
					handler(event.target.dataset.serial);
				}
				this.imageWindow.focus();
			}
		});
	}

	bindAdminMenu(hNewCategory, hRemoveCategory, hNewProduct, hRemoveProduct, hNewAuthor, hRemoveAuthor, handler) {
		$('#lnewCategory').click((event) => {
			this.#executeHandler(hNewCategory, [], '#new-category',
				{ action: 'newCategory' }, '#', event);
		});
		$('#ldelCategory').click((event) => {
			this.#executeHandler(hRemoveCategory, [], '#remove-category',
				{ action: 'removeCategory' }, '#', event);
		});
		$('#lnewImage').click((event) => {
			this.#executeHandler(hNewProduct, [], '#new-product', { action: 'newProduct' }, '#', event);
		});
		$('#ldelImage').click((event) => {
			this.#executeHandler(hRemoveProduct, [], '#remove-product', { action: 'removeProduct' }, '#', event);
		});
		$('#lnewAuthor').click((event) => {
			this.#executeHandler(hNewAuthor, [], '#new-author',
				{ action: 'newAuthor' }, '#', event);
		});
		$('#ldelAuthor').click((event) => {
			this.#executeHandler(hRemoveAuthor, [], '#remove-author',
				{ action: 'removeAuthor' }, '#', event);
		});
		$('#lObjects').click((event) => {
			this.#executeHandler(handler, [], 'body',
				{ action: 'init' }, '#', event);
		});
	}

	bindFavMenu(hAddFavImage, hRemoveFavImage) {
		$('#lnewFavImage').click((event) => {
			this.#executeHandler(hAddFavImage, [], '#new-category',
				{ action: 'newCategory' }, '#', event);
		});
		$('#ldelFavImage').click((event) => {
			this.#executeHandler(hRemoveFavImage, [], '#remove-category',
				{ action: 'removeCategory' }, '#', event);
		});
	}

	bindNewCategoryForm(handler) {
		newCategoryValidation(handler);
	}

	bindNewProductForm(handler){
		newProductValidation(handler);
	}

	bindNewAuthorForm(handler) {
		newAuthorValidation(handler);
	}

	bindRemoveCategoryForm(handler) {
		$('#remove-category').find('button').click(function (event) {
			handler(this.dataset.category, $(this).closest('div.cat').index());
		});
	}

	bindRemoveProductSelects(hTypes, hCategories){
		$('#rpType').change((event) => {
			this.#executeHandler(
				hTypes, [event.target.value],
				'#remove-product',
				{action: 'removeProductByType', type: event.target.value},
				'#remove-product', event
			);
		});
		$('#rpCategories').change((event) => {
			this.#executeHandler(
				hCategories, [event.target.value],
				'#remove-product',
				{action: 'removeProductByCategory', category: event.target.value},
				'#remove-product', event
			);
		});
	}

	bindAddFavImagesSelect(hTypes, hCategories) {
		$('#fiType').change((event) => {
			this.#executeHandler(
				hTypes, [event.target.value],
				'#fav-image',
				{action: 'addFavImageByType', type: event.target.value},
				'#fav-image', event
			);
		});
		$('#fiCategories').change((event) => {
			this.#executeHandler(
				hCategories, [event.target.value],
				'#fav-image',
				{action: 'addFavImageByCategory', category: event.target.value},
				'#fav-image', event
			);
		});
	}

	bindRemoveProduct(handler){
		$('#product-list a.btn').click(function (event){
			handler(this.dataset.serial, $(this).closest('div.rProduct').index());
			event.preventDefault();
		});
	}

	bindAddFavImages(handler){
		$('#image-list a.btn').click(function (event){
			handler(this.dataset.serial, $(this).closest('div.fiImage').index());
			event.preventDefault();
		});
	}

	bindRemoveAuthorForm(handler) {
		$('#remove-author').find('button').click(function (event) {
			handler(this.dataset.category, $(this).closest('div.cat').index());
		});
	}

}
