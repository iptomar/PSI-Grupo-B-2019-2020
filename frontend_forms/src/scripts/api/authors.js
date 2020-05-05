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
        
            }
    
};

let name = "Salazar";
authorsApi.create(name).then( (response) =>{
console.log(""+JSON.stringify(response))
}).catch( (error) => {
console.log("deu problemas: "+JSON.stringify(error))
});

export default authorsApi;