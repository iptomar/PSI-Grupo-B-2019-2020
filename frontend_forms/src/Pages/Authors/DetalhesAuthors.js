import React, { Component } from 'react';
import './AuthorsList';
import './CreateAuthors';
import usersApi from "../../scripts/api/users";
import authorsApi from "../../scripts/api/authors";

class DetalhesAuthors extends Component {
    constructor (props){
        super(props);

        let authorsId = props.match.params.AuthorsId;

        this.state = {
            authorsInfo: JSON.parse(sessionStorage.getItem("author"))
        };

        usersApi.validateAuth(this.props);

    }


        render() {

            let authors=[];
       
            if(this.state.authorsInfo!=null){
    
                authors.push(
                    <dl>
                        <dd>Author Name</dd>
                        <dt>{this.state.authorsInfo.name}</dt>
                    </dl>
                );
            }

                return (
                
                <div>
                    <h1>Detalhes Routes</h1>
                    {authors}
                
                </div>
                
            );
        
     }
        
    }


export default DetalhesAuthors;