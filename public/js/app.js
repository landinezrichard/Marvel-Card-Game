"use strict";

var MarvelApi = window.MarvelApi;

var apikey = "abf73bd71b9caf5d32a55e18f5bd24ae";

var api = new MarvelApi(apikey);

api.findSeries("avengers").then(function (serie) {
	var serieImage = "url(" + serie.thumbnail.path + "." + serie.thumbnail.extension + ")";
	$(".Layout").css("background-image", serieImage);

	var charactersUrl = serie.characters.collectionURI;
	var limit = $(".Card").length * 2;
	return api.getCharacters(charactersUrl, limit);
	//codigo ya no usado, que hacia 20 peticiones de personajes
	/*
 	let characters = serie.characters.items;
 	let promises = [];
 	for (let character of characters) {
 	    let promise = api.getResourceURI(character.resourceURI);
 	    // genera una promise por cada personaje
 	    promises.push(promise);
 	}
 */

	/* aqui promises ya tiene un array de Promises con las peticiones para cada personaje
 	
 Promise.all --> regresa una promesa que solo se resuelve cuando todas las promesas del array estan resueltas	
 */
	//Petición vieja, para resolver las 20 promesas....1 por cada personaje
	/*
 	return Promise.all(promises);
 */
}).then(function (characters) {
	/* solo llegamos a este punto cuando marvel.com 
 nos regresó todos los personajes de los avengers
 */
	/*filtramos, obteniendo solo los personajes que tienen imagen.
 
 	Los que no tienen imagen devoveran "null" en ese campo.
 
 	Si hacemos:
 
 		!null --> esto da true.
 		!!null --> devuelve false
 
 */
	return characters.filter(function (character) {
		if (character.thumbnail === null) {
			return false;
		} else {
			var spliter = character.thumbnail.path.split("/");
			spliter = spliter.pop();
			var imageInfo = "image_not_available";
			if (spliter === imageInfo) {
				return false;
			} else {
				return true;
			}
		}
		/*
  let spliter = character.thumbnail.path.split("/");
  spliter = spliter.pop();		
  const imageInfo = "image_not_available";		
  return !!character.thumbnail && !(spliter === imageInfo);*/
	});
	//console.log(characters);	
}).then(function (characters) {
	/* aqui tenemos solo personajes que si tienen imagen*/

	characters = shuffleArray(characters);

	$(".Card").each(function (i, item) {

		var character = characters[i];
		var $this = $(item);
		var $image = $this.find(".Card-image");
		var $description = $this.find(".Card-description");
		var $name = $this.find(".Card-name");

		var imageSize = "standard_amazing";

		$image.attr({
			"src": character.thumbnail.path + "/" + imageSize + "." + character.thumbnail.extension,
			"alt": "" + character.name
		});
		$name.text(character.name);
		$description.text(character.description);

		/*Codigo miestras Marvel agrega la imagen de In-Betweener*/
		if (character.name === "In-Betweener") {
			$image.attr("src", character.thumbnail.path + "/standard_xlarge." + character.thumbnail.extension);
		}
	});
})["catch"](function (err) {
	//debugger;
	console.error(err);
});

function shuffleArray(arr) {
	for (var i = 0; i < arr.length; i++) {
		var tmp = arr[i];
		var index = Math.floor(Math.random() * (arr.length - 1));
		arr[i] = arr[index];
		arr[index] = tmp;
	}
	return arr;
}