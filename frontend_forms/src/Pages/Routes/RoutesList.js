import React, { Component } from 'react';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from '../../scripts/api/users';

export default class RoutesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "rotas": {},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);

        this.getRoutesList();
    }

    render() {
        
            let items = [];
            const rotas = this.state.rotas;
            for( let rota in rotas) {
                let i = <tr style = {{
                    textAlign: "center"
                }} key = {rotas}>
                    <td> {rotas[rota].id} </td>
                    <td> {rotas[rota].name} </td>   
                    <td>
                        <button type="button" class="btn btn-danger"  onClick = {() => this.deleteRoute(rotas[rota].id, rota)}>Apagar</button>
                        <button type="button" class="btn btn-info"  onClick = {() => this.editRoute(rotas[rota].id)}>Editar</button>
                    </td>            
                </tr>;

                items.push(i);
            }
            console.log(items);

            return (
                <div>
                    <div className="stuff">
                        <table className = "table table-hover table-dark table-striped rounded" id="roteiros">
                            <caption>Lista de Rotas</caption>
                            <thead>
                                <tr style = {{ textAlign: "center" }}>
                                    <th scope = "col">ID</th>
                                    <th scope = "col">Nome</th>
                                    <th scope = "col">Apagar/Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
           
    }

    getRoutesList() {
        roteirosApi.list().then( (response) => {
            this.setState({rotas:response.data});
        })
    }

    deleteRoute(id, index) {
        console.log(id, index);
    }

    editRoute(id) {
        console.log(id);
    }  

}