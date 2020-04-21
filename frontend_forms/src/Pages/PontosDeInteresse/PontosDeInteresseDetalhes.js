import React, { Component } from 'react';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from '../../scripts/api/users';
import './CriarPontosInteresse.css';
import './PontosDeInteresseList';
import {Redirect} from "react-router-dom";

class PontosDeInteresseDetalhes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pontosDeInteresse: JSON.parse(sessionStorage.getItem("test")),
            vertices: []

        }
    }
    
    componentDidMount(){
      console.log(this.state.pontosDeInteresse);
    }


    render(){
      let listaPontosDeInteresseDetalhe = [];
      let teste = this.state.pontosDeInteresse;
      let vertices2 = this.state.vertices;
      let vertices1 = {coordinate1: '', coordinate2:'', order:''};
      //let verts = this.state.vertices.concat(vertices1); 
      //const images = {image:'',sourceAuthor:'',description:''};
      //let imagens = this.state.images.concat(images);
     // const file = this.fileUpload.files[0];
      //images.image = file;
  
      if(teste != 0){

          listaPontosDeInteresseDetalhe.push(
            <tr>
              <td>{teste.buildingName}</td>
              <br/>
              <td>{teste.location}</td>
              <br/>
              <td>{teste.dates}</td>
              <br/>
              <td>{teste.buildingType}</td>
              <br/>
              <td>{teste.location}</td>
              <br/>
              <td>{teste.description}</td>
              <br/>
              <td>{teste.coordinate1}</td>
              <br/>
              <td>{teste.coordinate2}</td>
              <br />
              <td>
              <p>
                {this.state.vertices.map(i => {
                    return <div >
                       <span>{i.auxCoordenada1}</span>
                       <span>{i.auxCoordenada2}</span>
                       <span>{i.auxOrder}</span>
                    </div>
                })}
                </p>

              </td>
             

            </tr>); 
        }

    

        return(<div>
            <h1>Detalhes de Pontos de Interesse</h1>
              <tbody>
                {listaPontosDeInteresseDetalhe}
						  </tbody>
            </div>
        );
  }
}

export default PontosDeInteresseDetalhes;