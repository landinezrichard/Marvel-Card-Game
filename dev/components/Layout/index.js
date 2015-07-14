let $ = require('jquery');
let page = require('page');

let homeTemplate = require('./template.jade');

page('/', restrict, home);

function restrict(ctx, next) {
	console.log('Restricting!');
	console.log('Context :' + JSON.stringify(ctx));
	console.log('window.user :' + JSON.stringify(window.user));
	if (!window.user) return page('/signin');

	next();
}

function home() {
  console.log('Page navigating to: HOME');
  $('.app-container').html(homeTemplate());
  require('../../avengers.js');  
}