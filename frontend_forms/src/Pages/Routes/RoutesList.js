import React, { Component } from 'react';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from '../../scripts/api/users';
import './Routes.css';

export default class RoutesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "rotas": {},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);

        this.getRoutesList(1);
    }

    render() {
        
            let items = [];
            const rotas = this.state.rotas;
            for( let rota in rotas) {
                let i = <tr style = {{
                    textAlign: "center"
                }} key = {rota}>
                    <td> {rotas[rota].id} </td>
                    <td> {rotas[rota].name} </td>   
                    <td>
                        <button type="button" class="btn btn-danger"  onClick = {() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deleteRoute(rotas[rota].id, rota)}}>Apagar</button>
                        <button type="button" class="btn btn-info"  onClick = {() => this.editRoute(rotas[rota].id)}>Editar</button>
                    </td>            
                </tr>;

                items.push(i);
            }

            //PAGINACAO
            const pagination = [];
            if (this.state.last_page !== 1) {
                if(typeof this.state.current_page !== "undefined" && this.state.current_page !== 1) {
                    pagination.push(<li className="page-item"><a className="page-link" href="#" onClick={() => this.getRoutesList(this.state.current_page-1)}>&lt;</a></li>)
                };

                //numeros para as paginas
                console.log("lastpage", this.state.last_page);
                for( let i = 1; i <= this.state.last_page; i++) {
                    pagination.push(<li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.getRoutesList(i)}> {i} </a>
                                    </li>);
                };

                if (this.state.current_page !== this.state.last_page) {
                    pagination.push(<li className="page-item">
                                        <a className="page-link" href="#" onClick={() => this.getRoutesList(this.state.current_page + 1)}>&gt;</a>
                    </li>);
                };
            };

            return (
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
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            {pagination}
                        </ul>
                    </nav>
                </div>
            );
           
    }

    getRoutesList(page) {
        if(page < 1) {
            page = 1;
        };
        if(this.last_page !== null && page > this.last_page) {
            page = this.last_page;
        };
        roteirosApi.list(page).then( (response) => {
            this.setState({rotas:response.data,
                            current_page:response.current_page,
                            last_page:response.last_page});
            console.log('getlist', this.state.rotas)
        })
    }

    deleteRoute(id, index) {
        roteirosApi.delete(id).then( (response) => {
            let aux = this.state.rotas;
            console.log('aux', aux);
            aux.splice(index, 1);
            console.log('aux', aux);
            this.setState({rotas:aux});
            console.log(this.state.rotas);
        }).catch( (error) => {

        });
        console.log(id, index);
    }

    editRoute(id) {
        console.log(id);
    }  

}