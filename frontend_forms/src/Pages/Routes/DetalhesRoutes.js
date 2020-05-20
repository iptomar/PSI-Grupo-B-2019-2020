import React, { Component } from 'react';
import './RoutesList';
import './CreateRoutes';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from "../../scripts/api/users";
import pontosDeInteresseApi from "../../scripts/api/pontosDeInteresse";

class DetalhesRoutes extends Component {
    constructor (props){
        super(props);

        let routesId = props.match.params.RoutesId;

        this.state = {
            routesInfo: null
        };

        usersApi.validateAuth(this.props);
        this.getPontoByID(routesId);

    }


        render() {

            let routes=[];
            let items = [];
       
            if(this.state.routesInfo!=null){
    
                routes.push(
                    <tr>
                        <td>{this.state.routesInfo.name}</td>
                    </tr>
                );

                const pontosDeInteresse = this.state.routesInfo.buildings;
                console.log('render',this.state.pontosDeInteresse);
                for (let ponto in pontosDeInteresse) {

                    let i = <tr style={{
                        textAlign: "center"
                    }} key={ponto}>
                        <td >{pontosDeInteresse[ponto].id}</td>
                        <td >{pontosDeInteresse[ponto].buildingName}</td>
                        <td >{pontosDeInteresse[ponto].location}</td>
                        <td >{pontosDeInteresse[ponto].dates}</td>
                        <td >{pontosDeInteresse[ponto].approved}</td>
                    </tr>;

                    items.push(i);
                };
            }



                return (
                
                <div className="fundo4"> 
                    <div className="detalhesRoteiro">
                    <h1>Detalhes Routes</h1>
                        <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Name</th>
                            </thead>
                            <tbody>
                                {routes}
                            </tbody>
                        </table>

                    <h1>Pontos de interesse</h1>
                            <table className="table table-bordered table-light table-hover table-striped">
                                <thead class="thead-dark">
                                <tr style={{
                                    textAlign: "center"
                                }}>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Localização</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Approved</th>
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


     getPontoByID(id) {
         roteirosApi.get(id).then( (response) => {
            this.setState({routesInfo: response.route});
        }).catch( (error) => {

        });
    }
}


export default DetalhesRoutes;