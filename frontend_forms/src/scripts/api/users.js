// envia dados para o servidor (login)
let apiUrl=process.env.REACT_APP_API_URL_BASE;

let usersApi = {

    apiMe(){  
     var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wc2kyMDIwLnR1Z2FtYXJzLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTU4NTYwMTI4MywiZXhwIjoxNTg1NjA0ODgzLCJuYmYiOjE1ODU2MDEyODMsImp0aSI6IlBOS1k1YUJFWUlkZHU0bDEiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.lSN4GEPCKRbNZaZQFPpsmgKqFHzjQgvRPnuPY5MLXT8");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        
        };
    
    fetch("http://psi2020.tugamars.com/api/me?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wc2kyMDIwLnR1Z2FtYXJzLmNvbVwvYXBpXC9sb2dpbiIsImlhdCI6MTU4NTYwMTI4MywiZXhwIjoxNTg1NjA0ODgzLCJuYmYiOjE1ODU2MDEyODMsImp0aSI6IlBOS1k1YUJFWUlkZHU0bDEiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.lSN4GEPCKRbNZaZQFPpsmgKqFHzjQgvRPnuPY5MLXT8", requestOptions)
        .then(response => response.text())
            .then(result => console.log(result))
                .catch(error => console.log('error', error));
    },

    

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
                if(response.ok){
                    return Promise.resolve(json);
                } else {
                    return Promise.reject(json);
                }
            });
        });
    }

};



export default usersApi;