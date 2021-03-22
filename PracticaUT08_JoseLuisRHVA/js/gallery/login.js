"use strict";

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function login() {
	$('#bEntrar').click(function () {
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		if (username === 'admin' && password === 'admin') {
			alert("LOGIN CORRECTO");
			setCookie("username", username, 365);
		}
	});

}

function deleteCookie() {
	document.cookie = "username=; max-age=0;"
}

function check() {
	login();
	if (document.cookie !== "") {
		let myLogin = $('#myLogin');
		let myLogin2 = $('#myLogin');

		let containerSaludo = $(`<div class="container" id="saludo">Hola Admin!</div>`);
		let containerDescon = $(`<div class="container" id="descon" onclick="deleteCookie()"><a href="../index.html" id="desconE">Desconectar</a></div>`)

		myLogin.empty();
		myLogin.append(containerSaludo);
		myLogin.append(containerDescon);

		if (document.cookie == "") {
			myLogin.empty();
			myLogin.append(myLogin2);
			// myLogin.append(myLogin);
		}

	}
}
