
let apiUrl=process.env.REACT_APP_API_URL_BASE;

let usersApi = {

    login(email,password){
        let furl=apiUrl+"/api/login";

        let bodyc={
          "email":email,
          "password":password
        };

        return fetch(furl, {method:'POST',
            headers: { 'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify(bodyc)
        }).then( (response) => {
            return response.json().then( (json) => {
                if(response.on){
                    return Promise.resolve(json);
                } else {
                    return Promise.reject(json);
                }
            });
        });
    }

};

export default usersApi;