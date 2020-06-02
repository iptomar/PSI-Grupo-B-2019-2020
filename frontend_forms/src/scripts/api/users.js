// envia dados para o servidor (login)
let apiUrl=process.env.REACT_APP_API_URL_BASE;

let usersApi = {

    
    validateAuth(props,role=null){
        console.log("Validating auth...");

        let furl=apiUrl+"/me";
        let token="Bearer " + localStorage.getItem('auth.token');

        fetch(furl, {method:'GET', headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization':token
        }}).then( (response) => {

            if(response.ok){

                return response.json().then(data => {

                    console.log(data);
                    console.log("Role: " + role + " - Needed: " + data.user.role);

                    if(role!==null && role!==data.user.role){
                        console.log("Auth fail");
                        props.history.push('/login2');
                        
                    }  
                });

            } else {
                console.log("Auth fail");
                props.history.push('/login2');                
            }
        });       
    },

    //É um validate auth novo para usar na página de registo:
    //caso nao esteja logado, em vez de enviar para o login 2 retornar que nao esta logado para guardar no state.
    softValidateAuth(role=null){
        console.log("Validating auth...");

        let furl=apiUrl+"/me";
        let token="Bearer " + localStorage.getItem('auth.token');

        return fetch(furl, {method:'GET', headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
                'Authorization':token
        }}).then( (response) => {

            if(response.ok){
                return response.json().then(data => {
                    console.log(data);
                    console.log("Role: " + role + " - Needed: " + data.user.role);

                    if(role!==null && role!==data.user.role){
                        console.log("Auth fail 1");
                        return Promise.resolve(false);
                        
                    }else{
                        //se chegamos aqui, está logado
                        console.log("auth complete");
                        return Promise.resolve(true);
                    }  
                });
                
            } else {
                console.log("Auth fail 2");                
                return Promise.resolve(false); 
            }
        });       
        
    },    

    login(email,password){
        let furl=apiUrl+"/login";

        let bodyc={
          "email":email,
          "password":password
        };

        return fetch(furl, {method:'POST',
            headers: { 'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify(bodyc)
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

    register(email,name,password,password_confirmation,role){

        let furl=apiUrl+"/users";
        let token="Bearer " + localStorage.getItem("auth.token");

        let body = {
            "email": email,
            "name": name,
            "password": password,
            "password_confirmation": password_confirmation,
            "role": role
        };
        console.log("este é o novo body",body);

        return fetch(furl, {method:'POST',
                headers: { 'Content-Type':'application/json','Accept':'application/json', 'Authorization':token}, body: JSON.stringify(body)
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

    list(page=1){

        let furl=apiUrl+"/users?page="+page;
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

    delete(uid){
        let furl=apiUrl+"/users/"+uid;
        let token="Bearer " + localStorage.getItem("auth.token");

        return fetch(furl, {method:'DELETE', headers:{
                'Content-Type':'application/json','Accept':'application/json', 'Authorization':token
            }}).then( (response) => {
            if(response.ok){
                return Promise.resolve(response.json());
            } else {
                return Promise.reject(response.json());
            }
        });

    },

    get(uid){

        let furl=apiUrl+"/users/"+uid;
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

    update(uid,email, name, password, password_confirmation, role){

        let furl=apiUrl+"/users/"+uid;
        let token="Bearer " + localStorage.getItem("auth.token");
        let body = {
            "email": email,
            "name": name,
            "password": password,
            "password_confirmation": password_confirmation,
            "role": role
        };

        return fetch(furl, {method:'PATCH', headers:{
                'Content-Type':'application/json',
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

    //quando o utilizador nao for super admin
    createUser (email,name,password,password_confirmation) {

        let furl=apiUrl+"/users/register";

        let body = {
            "email": email,
            "name": name,
            "password": password,
            "password_confirmation": password_confirmation
        };
        console.log("body user",body);

        return fetch(furl, {method:'POST',
                headers: { 
                'Content-Type':'application/json',
                'Accept':'application/json'},
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

usersApi.update(37,"daniela@daniela.com","daniela","daniela","daniela", "superadmin").then( (response) =>{
    console.log(""+JSON.stringify(response))
    }).catch( (error) => {
    console.log("deu problemas: " +JSON.stringify(error))
    });


/*usersApi.createUser("da@da.com","da","da","da","register").then( (response) =>{
console.log(""+JSON.stringify(response))
}).catch( (error) => {
console.log("deu problemas: " +JSON.stringify(error))
});*/

export default usersApi;