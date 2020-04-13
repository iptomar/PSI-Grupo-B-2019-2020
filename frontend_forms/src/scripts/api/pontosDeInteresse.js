// API que lida com todas as operações relacionadas com os pontos de interesse
let apiUrl = process.env.REACT_APP_API_URL_BASE;

let pontosDeInteresseApi = {


  list() {

    let furl=apiUrl+"/buildings";
        let token="Bearer " + localStorage.getItem("auth.token");

        return fetch(furl, {method:'GET', headers:{
                'Content-Type':'application/json','Accept':'application/json', 'Authorization':token
            }}).then( (response) => {
                if(response.ok){
                    return Promise.resolve(response.json());
                } else {
                    return Promise.reject(response.json());
                }
            });
  },
  //dates é em array?
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
    let token="Bearer " + localStorage.getItem("auth.token");
    let body = {
      "buildingName": buildName,
      "location": location,
      "dates": dates,
      "buildingType": type,
      "description": description,
      "coordinate1": cc1,
      "coordinate2": cc2,
      "vertices": vertices,
      "images": imagens,
      "authors": authors,
      "routes": routes,
    };
    
    return fetch( furl, {method:'POST',
                         headers:{'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token},
                         body: JSON.stringify(body)
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

    return fetch(furl, {method:'DELETE', headers:{
      'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token
    }
    }).then( (response) =>{
      if (response.ok) {
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  },

  edit(id, buildName, location, dates, type, description, cc1, cc2, vertices, imagens, authors, routes) {
    let furl = apiUrl + "/buildings/" + id ;
    let token="Bearer " + localStorage.getItem("auth.token");
    let body = {
      "buildingName": buildName,
      "location": location,
      "dates": dates,
      "buildingType": type,
      "description": description,
      "coordinate1": cc1,
      "coordinate2": cc2,
      "vertices": vertices,
      "images": imagens,
      "authors": authors,
      "routes": routes,
    };
    
    return fetch( furl, {method:'POST',
                         headers:{'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token},
                         body: JSON.stringify(body)
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