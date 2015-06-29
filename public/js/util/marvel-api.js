"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MarvelApi = (function () {
	function MarvelApi(apikey) {
		_classCallCheck(this, MarvelApi);

		this.apikey = apikey;
		this.baseUrl = "http://gateway.marvel.com/v1/public/";
	}

	_createClass(MarvelApi, [{
		key: "findSeries",
		value: function findSeries(title) {
			var url = this.baseUrl + "series?title=" + title + "&apikey=" + this.apikey;
			/*Comprobamos si está en cache*/
			if (localStorage[url]) {
				var datos = localStorage[url];
				/*Convertimos el string a JSON*/
				datos = JSON.parse(datos);
				/*resolvemos la promesa*/
				return Promise.resolve(datos);
			}
			// hace que la peticion de jQuery se vuelva una Promise
			return Promise.resolve($.get(url)).then(function (res) {
				var datos = res.data.results[0];
				/*Convertimos los datos a string*/
				var cache = JSON.stringify(datos);
				/*almacenamos los datos en cache*/
				localStorage[url] = cache;
				/* regresamos una nueva promesa con el primer resultado de acuerdo a lo que nos regresa marvel*/
				return Promise.resolve(datos);
			});
		}
	}, {
		key: "getResourceURI",
		value: function getResourceURI(resourceURI) {
			var url = resourceURI + "?apikey=" + this.apikey;
			if (localStorage[url]) {
				var datos = localStorage[url];
				datos = JSON.parse(datos);
				return Promise.resolve(datos);
			}
			return Promise.resolve($.get(url)).then(function (res) {
				var datos = res.data.results[0];
				var cache = JSON.stringify(datos);
				localStorage[url] = cache;
				return Promise.resolve(datos);
			});
		}
	}, {
		key: "getCharacters",
		value: function getCharacters(collectionURI, limit) {
			limit = limit || 40;
			var url = collectionURI + "?limit=" + limit + "&apikey=" + this.apikey;
			if (localStorage[url]) {
				var datos = localStorage[url];
				datos = JSON.parse(datos);
				return Promise.resolve(datos);
			}
			return Promise.resolve($.get(url)).then(function (res) {
				var datos = res.data.results;
				//debugger;
				var cache = JSON.stringify(datos);
				localStorage[url] = cache;
				return Promise.resolve(datos);
			});
		}
	}]);

	return MarvelApi;
})();

window.MarvelApi = MarvelApi;

//http://gateway.marvel.com:80/v1/public/series/354/characters?limit=40&apikey=abf73bd71b9caf5d32a55e18f5bd24ae

/* "characters": {
          "available": 105,
          "collectionURI": "http://gateway.marvel.com/v1/public/series/354/characters",

*/