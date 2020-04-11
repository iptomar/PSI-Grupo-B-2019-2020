// API que lida com todas as operações relacionadas com os pontos de interesse
let apiUrl = process.env.REACT_APP_API_URL_BASE;

let pontosDeInteresseApi = {

  testeParaAPI() {
    console.log("função de pontos de interesse");
  },

  list() {

  },

  create() {

  },

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