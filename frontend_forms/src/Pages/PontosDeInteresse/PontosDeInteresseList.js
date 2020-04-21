import React, { Component } from 'react';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from '../../scripts/api/users';
import './CriarPontosInteresse.css';
import { Redirect } from 'react-router-dom';

export default class pontosDeInteresseList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      images: [],
      vertices: [],
      authors: [],
      routes: [],
      auxNameAuthor:'',
      nameRoute:'',
      auxCoordenada1:'',
      auxCoordenada2:'',
      auxOrder:'',
      "redirect": false,
      "pontosDeInteresse": {},
      "current_page":1,
      "last_page":null,
    };
    //this.fileInput = React.createRef();
    this.detalhesPontoDeInteresse();
    usersApi.validateAuth(this.props);

    this.getPontosDeInteresseList(1);   
  }

  render() {
    if(this.state.redirect == true){
      return (<Redirect to="/PointsOfInterest/PontosDeInteresseDetalhes"/>);
    }

    let items = [];
    const pontosDeInteresse = this.state.pontosDeInteresse;
    console.log('render',this.state.pontosDeInteresse);
    for (let ponto in pontosDeInteresse) {

      let i = <tr style={{
        textAlign: "center"
      }} key={ponto}>
        <td >{pontosDeInteresse[ponto].id}</td>
        <td >{pontosDeInteresse[ponto].buildingName}</td>
        <td >{pontosDeInteresse[ponto].location}</td>
        <td >{pontosDeInteresse[ponto].dates}</td>
        <td >
          <button type="button" class="btn btn-danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deletePontoDeInteresse(pontosDeInteresse[ponto].id, ponto)}}>Apagar</button>
          <button type="button" class="btn btn-info" onClick={() => this.editPontoDeInteresse(pontosDeInteresse[ponto].id)}>Editar</button>
          <button type="button" class="btn btn-success" onClick={() => this.detalhesPontoDeInteresse(pontosDeInteresse[ponto].id, ponto)}>Detalhes</button>
        </td>
      </tr>;

      items.push(i);
    };

    //Paginator TODO: mudar a cor dos botoes?
    const pagination=[];
    if(this.state.last_page!==1){
      //primeiro simbolo (<) existe?
      if(typeof this.state.current_page !== "undefined" && this.state.current_page !== 1){
          pagination.push(<li class="page-item"> <a class="page-link" href="#" onClick={()=>this.getPontosDeInteresseList(this.state.current_page-1)}> &lt;</a> </li>);
      };
      //numeros para as paginas. TODO: limitar o numero de quadrados possiveis
      console.log("lastpage",this.state.last_page);
      for(let i=1;i<=this.state.last_page;i++){
          pagination.push(<li class="page-item">
                           <a class="page-link" href="#" onClick={()=>this.getPontosDeInteresseList(i)} >{i}</a>
                            </li>);
      };  
      //segundo simbolo (>) existe?
      if(this.state.current_page !== this.state.last_page){
        pagination.push(<li class="page-item">
                         <a class="page-link" href="#" onClick={()=>this.getPontosDeInteresseList(this.state.current_page+1)}>&gt;</a>
                       </li>);
      };
    };

    return (
      <div className="stuff">
        <table className="table table-hover table-dark table-striped rounded" id="pontosDeInteresse">
          <caption>Lista dos Pontos de Interesse</caption>
          <thead>
            <tr style={{
              textAlign: "center"
            }}>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Localização</th>
              <th scope="col">Data</th>
              <th scope="col">Apagar/Editar/Detalhes</th>
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

  getPontosDeInteresseList(page) {

    if(page < 1){ page=1; }; //a pagina minima é 1
    //se soubermos qual a ultima pagina, e se a pagina atual é maior que a ultima -> a pagina tem de ser a ultima
    if(this.last_page !== null && page > this.last_page){ page=this.last_page; };
    pontosDeInteresseApi.list(page).then((response) => {
      this.setState({ pontosDeInteresse: response.data,
                      current_page:response.current_page,
                      last_page:response.last_page });
     console.log('getlist',this.state.pontosDeInteresse);
    });
    
  }

  detalhesPontoDeInteresse (id, index){
    pontosDeInteresseApi.get(id).then((response) =>{
        //console.log(response[id]);
        let imagens = {image:'',sourceAuthor:'',description:''};
        let autores = {name:''};
        let vertices = {coordinate1:'', coordinate2: '', order:''};
        let routes = {nome: ''};
        //const file = this.fileUpload.files[0];
        //imagens.image = file;
        autores.name = this.state.auxNameAuthor;
        routes.nome = this.state.nameRoute;
        vertices.coordinate1 = this.state.auxCoordenada1;
        vertices.coordinate2 = this.state.auxCoordenada2;
        vertices.order = this.state.auxOrder;
        sessionStorage.setItem("test", JSON.stringify(this.state.pontosDeInteresse[index]));
        this.setState({redirect: true,
                       buildingName: '',
                       location: '',
                       dates: '',
                       buildingType: '',
                       description: '',
                       coordinate1: '',
                       coordinate2: '',
                       images: this.state.images.concat(imagens),
                       vertices: this.state.vertices.concat(vertices),
                       authors: this.state.authors.concat(autores),
                       routes: this.state.routes.concat(routes)
                        });
    });
    
  }

  deletePontoDeInteresse(id, index) {
    pontosDeInteresseApi.delete(id).then( (response) => {
      let aux = this.state.pontosDeInteresse;
      console.log('aux', aux);
      aux.splice(index,1);
      console.log('aux',aux);
      this.setState({pontosDeInteresse:aux});
      console.log(this.state.pontosDeInteresse);
  }).catch( (error) => {

  });
    console.log(id, index)
  }

  editPontoDeInteresse(id) {
    this.props.history.push('/PointsOfInterest/' + id + '/edit');
  }

}