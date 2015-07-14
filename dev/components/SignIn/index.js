let $ = require('jquery');
let page = require('page');

let template = require('./template.jade');

page('/signin', signin);


function signin(ctx, next) {
	$('.app-container').html(template());
	$('.Signin-button').on('click', function (event) {
		event.preventDefault();

		let username = $('.Signin-name-input')[0].value;
		if (!username) return alert('Ingresa un nombre válido');
		window.user = { username: username };
		page('/');
	});
}