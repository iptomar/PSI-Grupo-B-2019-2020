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

                    <tr>
                        <td>{this.state.authorsInfo.name}</td>
                    </tr>
                );
            }

                return (
                    <div className="fundo3">
                        <h1 class="tituloAutor">Detalhes do Autor</h1>
                        <div className="detalhesAutor">
                            <table className="table tabelaAutor table-bordered table-light table-hover table-striped">
                                <thead class="thead-dark">
                                    <th scope="col" colSpan="4">Name</th>
                                </thead>
                                <tbody>
                                    {authors}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
        
        }
        
}


export default DetalhesAuthors;