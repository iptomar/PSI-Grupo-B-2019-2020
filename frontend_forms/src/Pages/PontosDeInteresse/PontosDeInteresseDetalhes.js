import React, { Component } from 'react';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from '../../scripts/api/users';
import './CriarPontosInteresse.css';
import './PontosDeInteresseList';
import {Redirect} from "react-router-dom";

class PontosDeInteresseDetalhes extends Component {
    constructor(props) {
        super(props);

        let pontoInteresseID = props.match.params.pontoInteresseID;

        this.state = {
            buildingInfo: null

        };

        usersApi.validateAuth(this.props);

        this.getPontoByID(pontoInteresseID);
    }
    
    componentDidMount(){
      console.log(this.state.pontosDeInteresse);
    }


    render(){

        let pi=[];
        let vertices=[];
        let images=[];
        let routes= [];
        let authors = [];

        if(this.state.buildingInfo!=null){

            let b=this.state.buildingInfo;

            pi.push(
                <div class="fundo2">
                    <div id="detalhesPontos1">
                            <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                    <th scope="col" colSpan="4">Building Information</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">Building Name</th>
                                        <td>{b.buildingName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Building Type</th>
                                        <td>{b.buildingType}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Location</th>
                                        <td>{b.location} (x: {b.coordinate1} ; y: {b.coordinate2})</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <td>{b.dates}</td>
                                    </tr>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <td>{b.description}</td>                     
                                    </tr>
                                </tbody>
                                
                                
                            </table>
                        </div>
                </div>
                
                
            );

            for(let k in b.vertices){
                if(b.vertices.hasOwnProperty(k)){
                    vertices.push(
                        <tr>  
                            <td>{b.vertices[k].coordinate1}</td>
                            <td>{b.vertices[k].coordinate2}</td>
                            <td>{b.vertices[k].order}</td>
                        </tr>
                    );
                }
            }


            for(let k in b.images){
                if(b.images.hasOwnProperty(k)){
                    let src = 'data:image/png;base64,'+b.images[k].base64;
                    images.push(
                        <tr>
                            <td><img src={src} height="150"/></td>
                            <td>{b.images[k].sourceAuthor}</td>
                            <td>{b.images[k].description}</td>
                        </tr>
                    );
                }
            }

            for(let k in b.authors){
                if(b.authors.hasOwnProperty(k)){
                    authors.push(
                        <tr >
                             <td>{b.authors[k].name}</td>
                        </tr>
                    );
                }
            }

            for(let k in b.routes){
                if(b.routes.hasOwnProperty(k)){
                    routes.push(
                       <tr>
                           <td>{b.routes[k].name}</td>
                       </tr>
                    );
                }
            }
        }

        return(<div>

            <div class="fundo2">
            <h1>Detalhes de Pontos de Interesse</h1>
                {pi}   
                    <div id="detalhesPontos2">
                        <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Author's Name(s)</th>
                            </thead>
                            <tbody>
                                {authors}
                            </tbody>  
                        </table>
                    </div>

                    <div id="detalhesPontos2">
                        <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Routes</th>
                            </thead>
                            <tbody>
                                {routes}
                            </tbody>
                        </table>
                    </div>

                    <div id="detalhesPontos3">
                        <table class="table table-bordered table-light table-hover table-striped">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Vertices</th>
                            </thead>
                            <tbody>
                                <th>X</th>
                                <th>Y</th>
                                <th>Order</th>
                                {vertices}
                            </tbody>
                        </table>
                    </div>

                    <div id="detalhesPontos3">
                        <table class="table table-bordered table-light table-hover table-striped ">
                            <thead class="thead-dark">
                                <th scope="col" colSpan="4">Images</th>
                            </thead>
                            <tbody>
                                <th>Image</th>
                                <th>Author</th>
                                <th>Description</th>
                                {images}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                
        );
  }

    getPontoByID(id) {
        pontosDeInteresseApi.get(id).then( (response) => {
            this.setState({buildingInfo: response.building});
        }).catch( (error) => {

        });
    }
}

export default PontosDeInteresseDetalhes;