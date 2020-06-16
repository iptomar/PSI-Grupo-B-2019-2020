import React, { Component } from 'react';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from '../../scripts/api/users';
import './Routes.css';
import { Redirect } from 'react-router-dom';

export default class RoutesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "rotas": {},
            "current_page":1,
            "last_page":null,
            "redirect": false
        };

        usersApi.validateAuth(this.props);
        this.detalhesRoute();
        //this.detalhesRoute = this.detalhesRoute.bind(this);
        this.editRoute= this.editRoute.bind(this);
        this.getRoutesList(1);
    }

    render() {

        if(this.state.redirect == true){
            return (<Redirect to="/Routes/edit"/>);
          }
      
        
            let items = [];
            const rotas = this.state.rotas;
            for( let rota in rotas) {
                let i = <tr style = {{
                    textAlign: "center"
                }} key = {rota}>
                    <td> {rotas[rota].id} </td>
                    <td> {rotas[rota].name} </td>   
                    <td> {rotas[rota].aproved} </td>   
                    <td>
                        <button type="button" class="btn btn-danger"  onClick = {() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deleteRoute(rotas[rota].id, rota)}}>Apagar</button>
                        <button type="button" class="btn btn-info"  onClick = {() => this.editRoute(rotas[rota].id)}>Editar</button>
                        <button type="button" class="btn btn-success"  onClick = {() => this.detalhesRoute(rotas[rota].id, rota)}>Detalhes</button>
                        <button type="button" class="btn btn-warning"  onClick = {() => {if (window.confirm('Are you sure you want to approve this route?'))this.aprovedRoutes(rotas[rota].id, rota)}}>Approve</button>
                    </td>            
                </tr>;

                items.push(i);
            }

            //PAGINACAO
            const pagination = [];
            if (this.state.last_page !== 1) {
                if( this.state.current_page !== "undefined" && this.state.current_page !== 1) {
                    pagination.push(<li className="page-item"><a className="page-link2" href="#" onClick={() => this.getRoutesList(this.state.current_page-1)}>&lt;</a></li>)
                };

                //numeros para as paginas
                console.log("lastpage", this.state.last_page);
                for( let i = 1; i <= this.state.last_page; i++) {
                    pagination.push(<li className="page-item">
                                        <a className="page-link2" href="#" onClick={() => this.getRoutesList(i)}> {i} </a>
                                    </li>);
                };

                if (this.state.current_page !== this.state.last_page) {
                    pagination.push(<li className="page-item">
                                        <a className="page-link2" href="#" onClick={() => this.getRoutesList(this.state.current_page + 1)}>&gt;</a>
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
                                <th scope = "col">Name</th>
                                <th scope = "col">Approved</th>
                                <th scope = "col">Delete/Edit/Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example" className="pageNavigation2">
                        <ul class="pagination">
                            {pagination}
                        </ul>
                    </nav>
                </div>
            );
           
    }
    aprovedRoutes (id, aproved){
        if(id !=0)
            aproved =1;
        roteirosApi.aprovedRoute(id).then ((response) => {
            this.setState({aproved: ''
                            });
            this.refreshPage();         
        })
       
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
           // this.setState({rotas:aux});
            console.log(this.state.rotas);
            this.refreshPage();
        }).catch( (error) => {

        });
        console.log(id, index);
    }

    editRoute(id) {
        this.props.history.push('/routes/' + id + '/edit');
    }  

    detalhesRoute(id, index){
        roteirosApi.get(id).then((response) => {
            sessionStorage.setItem("rota", JSON.stringify(this.state.rotas[index]));
            this.props.history.push('/routes/' + id + '/detalhes');
            this.setState({redirect: true,
                           name: '',
                           aproved: ''
                 });
                 this.refreshPage();
        })
        
        console.log(sessionStorage.getItem("rota"));
        
    }

    refreshPage(){
        window.location.reload();
    }

}