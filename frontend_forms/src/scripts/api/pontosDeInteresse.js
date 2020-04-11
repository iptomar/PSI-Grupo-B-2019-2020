// API que lida com todas as operações relacionadas com os pontos de interesse
let apiUrl = process.env.REACT_APP_API_URL_BASE;

let pontosDeInteresseApi = {

  testeParaAPI() {
    console.log("função de pontos de interesse");
  },

  list() {

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

  delete() {

  },

  edit() {

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
        
*/