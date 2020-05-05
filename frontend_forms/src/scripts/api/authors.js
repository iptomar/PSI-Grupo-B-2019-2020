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
};

export default authorsApi;