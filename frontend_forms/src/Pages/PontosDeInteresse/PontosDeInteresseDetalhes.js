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

        this.getPontoByID(pontoInteresseID);
    }
    
    componentDidMount(){
      console.log(this.state.pontosDeInteresse);
    }


    render(){

        let pi=[];
        let vertices=[];
        let images=[];

        if(this.state.buildingInfo!=null){

            let b=this.state.buildingInfo;

            pi.push(
                <dl>
                    <dd>Building name</dd>
                    <dt>{b.buildingName}</dt>
                    <dd>Building type</dd>
                    <dt>{b.buildingType}</dt>
                    <dd>Location</dd>
                    <dt>{b.location} (x:{b.coordinate1} ; y:{b.coordinate2})</dt>
                    <dd>Date</dd>
                    <dt>{b.date}</dt>
                    <dd>Description</dd>
                    <dt>{b.description}</dt>
                </dl>
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


        }

        return(<div>
            <h1>Detalhes de Pontos de Interesse</h1>
                {pi}

                <h3>Vertices</h3>
                <table>
                    <thead>
                        <th>X</th>
                        <th>Y</th>
                        <th>Order</th>
                    </thead>
                    <tbody>
                    {vertices}
                    </tbody>
                </table>



                <h3>Images</h3>
                <table>
                    <thead>
                    <th>Image</th>
                    <th>Author</th>
                    <th>Description</th>
                    </thead>
                    <tbody>
                    {images}
                    </tbody>
                </table>
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