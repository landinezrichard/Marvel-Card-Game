class MarvelApi {
	constructor (apikey) {
		this.apikey = apikey;
		this.baseUrl = "http://gateway.marvel.com/v1/public/"
	}

	findSeries (title) {
		let url = `${this.baseUrl}series?title=${title}&apikey=${this.apikey}`;
		/*Comprobamos si está en cache*/
		if(localStorage[url]){
			let datos = localStorage[url];
			/*Convertimos el string a JSON*/
			datos = JSON.parse(datos);
			/*resolvemos la promesa*/
			return Promise.resolve(datos);
		}
		// hace que la peticion de jQuery se vuelva una Promise
		return Promise.resolve($.get(url))		
		.then( (res) => {
			let datos = res.data.results[0];
			/*Convertimos los datos a string*/
			let cache = JSON.stringify(datos);
			/*almacenamos los datos en cache*/
			localStorage[url] = cache;
			/* regresamos una nueva promesa con el primer resultado de acuerdo a lo que nos regresa marvel*/
			return Promise.resolve(datos);
		});
	}

	getResourceURI (resourceURI) {
    	let url = `${resourceURI}?apikey=${this.apikey}`;
    	if (localStorage[url]) {
			let datos = localStorage[url];
			datos = JSON.parse(datos);			
			return Promise.resolve(datos);
    	}
    	return Promise.resolve($.get(url))
    	.then((res) => {
    		let datos = res.data.results[0];
    		let cache = JSON.stringify(datos);
    		localStorage[url] = cache;
    		return Promise.resolve(datos);      		
    	});
    }

    getCharacters (collectionURI, limit) {
    	limit = limit || 40;
    	let url = `${collectionURI}?limit=${limit}&apikey=${this.apikey}`;
    	if (localStorage[url]) {
			let datos = localStorage[url];
			datos = JSON.parse(datos);			
			return Promise.resolve(datos);
    	}
    	return Promise.resolve($.get(url))
    	.then((res) => {
    		let datos = res.data.results;
    		//debugger;
    		let cache = JSON.stringify(datos);
    		localStorage[url] = cache;
    		return Promise.resolve(datos);      		
    	});
    }
}

window.MarvelApi = MarvelApi;


//http://gateway.marvel.com:80/v1/public/series/354/characters?limit=40&apikey=abf73bd71b9caf5d32a55e18f5bd24ae

/* "characters": {
          "available": 105,
          "collectionURI": "http://gateway.marvel.com/v1/public/series/354/characters",

*/          