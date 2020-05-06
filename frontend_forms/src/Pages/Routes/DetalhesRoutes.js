import React, { Component } from 'react';
import './RoutesList';
import './CreateRoutes';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from "../../scripts/api/users";

class DetalhesRoutes extends Component {
    constructor (props){
        super(props);

        let routesId = props.match.params.routesId;

        this.state = {
            routesInfo: JSON.parse(sessionStorage.getItem("rota"))
        };

        usersApi.validateAuth(this.props);

    }


        render() {

            let routes=[];
       
            if(this.state.routesInfo!=null){
    
                routes.push(
                    <tr>
                        <td>{this.state.routesInfo.name}</td>
                    </tr>
                );
            }

                return (
                
                <div className="fundo4"> 
                    <h1>Detalhes Routes</h1>
                    <div className="detalhesRoteiro">
                        <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Name</th>
                            </thead>
                            <tbody>
                                {routes}
                            </tbody>
                        </table>
                    </div>

                </div>
            );
     }
}


export default DetalhesRoutes;