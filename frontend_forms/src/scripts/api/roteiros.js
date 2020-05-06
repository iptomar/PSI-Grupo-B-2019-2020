let apiUrl=process.env.REACT_APP_API_URL_BASE;

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
  },

  get(id) {
    let furl = apiUrl + "/routes/" + id;
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
    })
  },

  delete(id){
    let furl = apiUrl + "/routes/" + id;
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

  update(id, name){
    let furl = apiUrl + "/routes/" + id;
    let token = "Bearer " + localStorage.getItem("auth.token");

    let body = {
      "name": name
    }
    //let form = new FormData();
  //if(nameRoute!==null) form.append('nameRoute', nameRoute);
  
    return fetch(furl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        console.log("entrei e ta 200");
        return Promise.resolve(response.json());
      } else {
        return Promise.reject(response.json());
      }
    });
  },

  create(name, aproved){
    let furl = apiUrl + "/routes";
    let token = "Bearer " + localStorage.getItem("auth.token");
    let body ={
        "name": name,
        "aproved": aproved
    }
    let form = new FormData();
    form.append('name', name);

    return fetch(furl, {method:'POST',
                headers: { 'Content-Type':'application/json',
                'Accept':'application/json', 
                'Authorization':token}, 
                body: JSON.stringify(body)
            }).then( (response) => {
                return response.json().then( (json) => {
                    if(response.ok){
                        return Promise.resolve(json);
                    } else {
                        return Promise.reject(json);
                    }
                });
            });

  },

  aprovedRoute(id, aproved){
    let furl = apiUrl + "/routes/" + id + "/approve";
    let token = "Bearer " + localStorage.getItem("auth.token");

   let body ={
        "aproved": aproved
    }

   // let form = new FormData();
   // form.append('name', name);
    //if(aproved !=0)
    //form.append('aproved', aproved);

   /* for(let i in buildings){
      form.append('buildings['+i+'][buildingName]', buildings[i]["buildingName"]);
    }*/

    return fetch(furl, {method:'POST',
                headers: { 'Content-Type':
                'application/json',
                'Accept':'application/json', 
                'Authorization':token}, 
                body: JSON.stringify(body)
            }).then( (response) => {
                return response.json().then( (json) => {
                    if(response.ok){
                        return Promise.resolve(json);
                    } else {
                        return Promise.reject(json);
                    }
                });
            });

  }



}


/*roteirosApi.get(5).then( (response) =>{
  console.log("" + JSON.stringify(response))
}).catch( (error) => {
  console.log("deu problemas")
});*/

/*roteirosApi.delete(2).then( (response) =>{
  console.log("" +JSON.stringify(response))
}).catch( (error) => {
  console.log("deu problemas")
});*/

/*roteirosApi.update(5).then( (response) =>{
  console.log(""+JSON.stringify(response))
  }).catch( (error) => {
  console.log("deu problemas: "+JSON.stringify(error))
  });*/

  roteirosApi.aprovedRoute(254, 1).then( (response) =>{
    console.log(""+JSON.stringify(response))
    }).catch( (error) => {
    console.log("deu problemas: "+JSON.stringify(error))
    });

/*let name = "Lojas de Tomar";
let aproved = "0";
roteirosApi.create(name, aproved).then( (response) =>{
console.log(""+JSON.stringify(response))
}).catch( (error) => {
console.log("deu problemas: "+JSON.stringify(error))
});*/



export default roteirosApi;



