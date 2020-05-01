import React, { Component } from 'react';
import './RoutesList';
import './CreateRoutes';
import roteirosApi from '../../scripts/api/roteiros';

class DetalhesRoutes extends Component {
    constructor (props){
        super(props);

        let routesId = props.match.params.routesId;

        this.state = {
            routesInfo: JSON.parse(sessionStorage.getItem("rota"))
        }

    }


        render() {

            let routes=[];
       
            if(this.state.routesInfo!=null){
    
                routes.push(
                    <dl>
                        <dd>Route Name</dd>
                        <dt>{this.state.routesInfo.name}</dt>
                    </dl>
                );
            }

                return (
                
                <div>
                    <h1>Detalhes Routes</h1>
                    {routes}
                
                </div>
                
            );
        
     }
        
    }


export default DetalhesRoutes;