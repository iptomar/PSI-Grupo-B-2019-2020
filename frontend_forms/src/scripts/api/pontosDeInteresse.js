// API que lida com todas as operações relacionadas com os pontos de interesse
let apiUrl = process.env.REACT_APP_API_URL_BASE;

let pontosDeInteresseApi = {


  list(page) {

    let furl = apiUrl + "/buildings?page="+page;
    let token = "Bearer " + localStorage.getItem("auth.token");

    return fetch(furl, {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token
      }
    }).then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  },

  /**
   * 
   * @param {*} buildName 
   * @param {*} location  
   * @param {*} dates 
   * @param {*} type 
   * @param {*} description 
   * @param {*} cc1 
   * @param {*} cc2 
   * @param {*} vertices Array de objetos vertices {order:int,coordinate1:double,coordinate2:double}
   * @param {*} imagens Array de objetos imagens (image,sourceAuthor:string,descrition:string)
   * @param {*} authors Array de objetos autores {nome:string}
   * @param {*} routes Array de rotas
   */
  create(buildName, location, dates, type, description, cc1, cc2, vertices, imagens, authors, routes) {
    let furl = apiUrl + "/buildings";
    let token = "Bearer " + localStorage.getItem("auth.token");
    let form = new FormData();
    form.append('buildingName', buildName);
    form.append('location', location);
    form.append('dates', dates);
    form.append('buildingType', type);
    form.append('description', description);
    form.append('coordinate1', cc1);
    form.append('coordinate2', cc2);
    form.append('images', JSON.stringify(imagens));
    form.append('authors', authors);
    for(let i in imagens){
      form.append('images['+i+'][description]', imagens[i]["description"]);
      form.append('images['+i+'][sourceAuthor]', imagens[i]["sourceAuthor"]);
      form.append('images['+i+'][image]', imagens[i]["image"]);
    }
    for(let i in vertices){
      form.append('vertices['+i+'][coordinate1]', vertices[i]["coordinate1"]);
      form.append('vertices['+i+'][coordinate2]', vertices[i]["coordinate2"]);
      form.append('vertices['+i+'][order]', vertices[i]["order"]);
    }
    for(let i in authors){
      form.append('authors['+i+'][name]', authors[i]["name"]);
    }
    for(let i in routes){
      form.append('routes['+i+']', routes[i]);
    }
    console.log("ROTAS", routes);
    console.log("este é o form",[...form]);

    return fetch(furl, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Authorization': token },
      body: form
    }).then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  },

  /**
   * Devolve uma promise com os dados de um ponto de interesse
   * @param {*} id id do edificio
   */
  get(id) {
    let furl = apiUrl + "/buildings/" + id;
    let token = "Bearer " + localStorage.getItem("auth.token");

    return fetch(furl, {
      method: 'GET', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token
      }
    }).then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });

  },

  delete(id) {
    let furl = apiUrl + "/buildings/" + id;
    let token = "Bearer " + localStorage.getItem("auth.token");

    return fetch(furl, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token
      }
    }).then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  },

  edit(id, buildName, location, dates, type, description, cc1, cc2, vertices, 
    routes, imagens, authors) {
    let furl = apiUrl + "/buildings/" + id;
    let token = "Bearer " + localStorage.getItem("auth.token");

    let form = new FormData();
if(buildName!==null) form.append('buildingName', buildName);
if(location!==null)form.append('location', location);
if(dates!==null)form.append('dates', dates);
if(type!==null)form.append('buildingType', type);
if(description!==null)form.append('description', description);
if(cc1!==null)form.append('coordinate1', cc1);
if(cc2!==null)form.append('coordinate2', cc2);


for(let i in imagens){
  console.log("Imagem single");
  console.log(imagens[i]["image"]);
  form.append('images['+i+'][description]', imagens[i]["description"]);
  form.append('images['+i+'][sourceAuthor]', imagens[i]["sourceAuthor"]);
  form.append('images['+i+'][image]', imagens[i]["image"]);
}

for(let i in vertices){
  form.append('vertices['+i+'][coordinate1]', vertices[i]["coordinate1"]);
  form.append('vertices['+i+'][coordinate2]', vertices[i]["coordinate2"]);
  form.append('vertices['+i+'][order]', vertices[i]["order"]);
}
for(let i in authors){
form.append('authors['+i+'][name]', authors[i]["name"]);
}

    return fetch(furl, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Authorization': token },
      body: form
    }).then((response) => {
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  }


};

export default pontosDeInteresseApi;

/**********************************************************************************************/
// Snippets que usei para testar as funções que podem voltar a ser uteis -Bernardo
/*
  *********************** get(id) ***********************************
  pontosDeInteresseApi.get(3).then( (response) =>{
            console.log(""+JSON.stringify(response))
        }).catch( (error) => {
            console.log("deu problemas")
        });

  ********************** create() ***********************************
   let buildingName = "Convento do Bernardo";
			let location = "Castelo de Tomar";
			let data = 1000;
			let buildingType = "Monumento";
			let description = "convento para testar a inserção";
			let cc1 = 0.314;
			let cc2 = 93.345;
			let vertices = [{
				"coordinate1": 93.5,
				"coordinate2": 93.6,
				"order": 3,
			},
			{
				"coordinate1": 94.5,
				"coordinate2": 94.6,
				"order": 2,
			},
			{
				"coordinate1": 95.5,
				"coordinate2": 95.6,
				"order": 1,
			}];
			let images = [{
			"image": 'C:\\Users\\Bernardo\\Desktop',
			"description": "teste para criar um edificio",
			"sourceAuthor": "TGM",
			}];
			let authors = [{
				"name": "Bernardo Alegria"
			}];
			let routes = [2];

			pontosDeInteresseApi.create(buildingName,location,data,buildingType,description,
																	cc1,cc2,vertices,images,authors,routes).then( (response) =>{
				console.log(""+JSON.stringify(response))
		}).catch( (error) => {
				console.log("deu problemas: "+JSON.stringify(error))
    });

    ********************** delete() ***********************************
      pontosDeInteresseApi.delete(11).then( (response) =>{
				console.log(""+JSON.stringify(response))
		}).catch( (error) => {
				console.log("deu problemas")
		});

    **********************  edit()  ***********************************
*/