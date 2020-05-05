// API que lida com todas as operações relacionadas com os autores

let apiUrl = process.env.REACT_APP_API_URL_BASE;

let authorsApi = {
    list(page,search=null) {

        let furl = apiUrl + "/authors?page="+page;
        let token = "Bearer " + localStorage.getItem("auth.token");

        if(search!=null){
            furl+="&search="+search;
        }

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

    create(name){
        let furl = apiUrl + "/authors";
        let token = "Bearer " + localStorage.getItem("auth.token");
        let body ={
            "name": name
        }
        let form = new FormData();
        form.append('name', name);
    
        return fetch(furl, {method:'POST',
                    headers: { 'Content-Type':'application/json','Accept':'application/json', 'Authorization':token}, 
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

            get(id) {
                let furl = apiUrl + "/authors/" + id;
                let token = "Bearer " + localStorage.getItem("auth.token");
                return fetch(furl, {
                  method: 'GET', headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                    'Authorization': token
                  }
                }).then((response) => {
                  if (response.ok) {
                    return Promise.resolve(response.json());
                  } else {
                    return Promise.reject(response.json());
                  }
                })
              },

              update(id, name){
                let furl = apiUrl + "/authors/" + id;
                let token = "Bearer " + localStorage.getItem("auth.token");
                let body = {
                  "name": name
                }
                return fetch(furl, {
                  method: 'PATCH',
                  headers: { 
                'Content-Type': 'application/json',
                 'Accept': 'application/json', 
                 'Authorization': token },
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

              delete(id){
                let furl = apiUrl + "/authors/" + id;
                let token = "Bearer " + localStorage.getItem("auth.token");
                return fetch(furl, {
                  method: 'DELETE', 
                  headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json', 
                    'Authorization': token
                  }
                }).then((response) => {
                  if (response.ok) {
                    return Promise.resolve(response.json());
                  } else {
                    return Promise.reject(response.json());
                  }
                });
              }
    
    };

/*authorsApi.delete(11).then( (response) =>{
  console.log("" +JSON.stringify(response))
}).catch( (error) => {
  console.log("deu problemas")
});*/


authorsApi.update(6).then( (response) =>{
  console.log(""+JSON.stringify(response))
  }).catch( (error) => {
  console.log("deu problemas: "+JSON.stringify(error))
  });

 /*   authorsApi.get(6).then( (response) =>{
  console.log("" + JSON.stringify(response))
}).catch( (error) => {
  console.log("deu problemas:" +JSON.stringify(error))
});*/

/*let name = "Salazar";
authorsApi.create(name).then( (response) =>{
console.log(""+JSON.stringify(response))
}).catch( (error) => {
console.log("deu problemas: "+JSON.stringify(error))
});*/

export default authorsApi;