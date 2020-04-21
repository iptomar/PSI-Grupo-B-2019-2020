let apiUrl = process.env.REACT_APP_API_URL_BASE;

let roteirosApi = {

  list(page){
    let furl = apiUrl + "/routes?page="+page;
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
  }
}

export default roteirosApi;