"use strict";

function showFeedBack(input, valid, message) {
	let validClass = (valid) ? 'is-valid' : 'is-invalid';
	let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
	input.nextAll('div').removeClass('d-block');
	div.removeClass('d-none').addClass('d-block');
	input.removeClass('is-valid is-invalid').addClass(validClass);
	if (message) {
		div.empty();
		div.append(message);
	}
}

function defaultCheckElement(event) {
	this.value = this.value.trim();
	if (!this.checkValidity()) {
		showFeedBack($(this), false);
	} else {
		showFeedBack($(this), true);
	}
}

function newCategoryValidation(handler) {
	let form = document.forms.fNewCategory;
	$(form).attr('novalidate', true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		this.ncDescription.value = this.ncDescription.value.trim();
		showFeedBack($(this.ncDescription), true);

		if (!this.ncUrl.checkValidity()) {
			isValid = false;
			showFeedBack($(this.ncUrl), false);
			firstInvalidElement = this.ncUrl;
		} else {
			showFeedBack($(this.ncUrl), true);
		}

		if (!this.ncTitle.checkValidity()) {
			isValid = false;
			showFeedBack($(this.ncTitle), false);
			firstInvalidElement = this.ncTitle;
		} else {
			showFeedBack($(this.ncTitle), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.ncTitle.value, this.ncUrl.value, this.ncDescription.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.ncTitle).change(defaultCheckElement);
	$(form.ncUrl).change(defaultCheckElement);
}

function newAuthorValidation(handler) {
	let form = document.forms.fNewAuthor;
	$(form).attr('novalidate', true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		this.naAvatar.value = this.naAvatar.value.trim();
		showFeedBack($(this.naAvatar), true);

		if (!this.naNickname.checkValidity()) {
			isValid = false;
			showFeedBack($(this.naNickname), false);
			firstInvalidElement = this.naNickname;
		} else {
			showFeedBack($(this.naNickname), true);
		}

		if (!this.naEmail.checkValidity()) {
			isValid = false;
			showFeedBack($(this.naEmail), false);
			firstInvalidElement = this.naEmail;
		} else {
			showFeedBack($(this.naEmail), true);
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			handler(this.naEmail.value, this.naNickname.value, this.naAvatar.value);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.naNickname).change(defaultCheckElement);
	$(form.naAvatar).change(defaultCheckElement);
}

function newProductValidation(handler) {
	let form = document.forms.fNewProduct;
	$(form).attr('novalidate', true);

	$(form).submit(function (event) {
		let isValid = true;
		let firstInvalidElement = null;

		this.npDescription.value = this.npDescription.value.trim();
		showFeedBack($(this.npDescription), true);


		if (!this.npTitle.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npTitle), false);
			firstInvalidElement = this.npTitle;
		} else {
			showFeedBack($(this.npTitle), true);
		}


		if (!this.npCategories.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npCategories), false);
			firstInvalidElement = this.npCategories;
		} else {
			showFeedBack($(this.npCategories), true);
		}


		if (!this.npAuthors.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npAuthors), false);
			firstInvalidElement = this.npAuthors;
		} else {
			showFeedBack($(this.npAuthors), true);
		}

		console.log(this.npAuthors.value);


		if (!this.npUrl.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npUrl), false);
			firstInvalidElement = this.npUrl;
		} else {
			showFeedBack($(this.npUrl), true);
		}

		if (!this.npCoords.checkValidity()) {
			isValid = false;
			showFeedBack($(this.npCoords), false);
			firstInvalidElement = this.npCoords;
		} else {
			showFeedBack($(this.npCoords), true);
		}

		if (!this.npType[0].checkValidity()) {
			isValid = false;
			let container = $('#cType');
			let div = container.find('div.invalid-feedback');
			container.last().find('div').removeClass('d-block');
			div.removeClass('d-none').addClass('d-block');
			$(this).find('input[type="radio"]').parent().parent().next().removeClass('is-valid is-invalid').addClass('is-invalid');;
			firstInvalidElement = this.npType[0];
		} else {
			let container = $('#cType');
			let div = container.find('div.valid-feedback');
			container.last().find('div').removeClass('d-block');
			div.removeClass('d-none').addClass('d-block');
			$(this).find('input[type="radio"]').parent().parent().next().removeClass('is-valid is-invalid');
			$(this).find('input[type="radio"]:checked').parent().parent().next().addClass('is-valid');
		}

		if (!isValid) {
			firstInvalidElement.focus();
		} else {
			let categories = [...this.npCategories.selectedOptions].map(function (option) {
				return option.value;
			})
			handler(this.npTitle.value,
				this.npType.value, this.npUrl.value,
				this.npDescription.value, this.npCoords.value, categories, authors);
		}
		event.preventDefault();
		event.stopPropagation();
	});

	form.addEventListener('reset', (function (event) {
		let feedDivs = $(this).find('div.valid-feedback, div.invalid-feedback');
		feedDivs.removeClass('d-block').addClass('d-none');
		let inputs = $(this).find('input, textarea, select, label');
		inputs.removeClass('is-valid is-invalid');
	}));

	$(form.ncTitle).change(defaultCheckElement);
	$(form.ncUrl).change(defaultCheckElement);
}
