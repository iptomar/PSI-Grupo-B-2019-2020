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

    register(email,name,password,password_confirmation){

        let furl=apiUrl+"/users";
        let token="Bearer " + localStorage.getItem("auth.token");

        let body = {
            "email": email,
            "name": name,
            "password": password,
            "password_confirmation": password_confirmation,
        };

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

    update(uid,body){

        let furl=apiUrl+"/users/"+uid;
        let token="Bearer " + localStorage.getItem("auth.token");

        return fetch(furl, {method:'PATCH', headers:{
                'Content-Type':'application/json','Accept':'application/json', 'Authorization':token}, 
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

};



export default usersApi;