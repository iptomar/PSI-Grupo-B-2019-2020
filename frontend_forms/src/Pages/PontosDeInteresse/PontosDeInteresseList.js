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

    usersApi.validateAuth(this.props);

    this.getPontosDeInteresseList(1);   
  }

  render() {
    if(this.state.redirect == true){
      return (<Redirect to="/PointsOfInterest/PontosDeInteresseDetalhes"/>);
    }

    let items = [];
    const pontosDeInteresse = this.state.pontosDeInteresse;

    for (let ponto in pontosDeInteresse) {

      let i = <tr style={{
        textAlign: "center"
      }} key={ponto}>
        <td >{pontosDeInteresse[ponto].id}</td>
        <td >{pontosDeInteresse[ponto].buildingName}</td>
        <td >{pontosDeInteresse[ponto].location}</td>
        <td >{pontosDeInteresse[ponto].dates}</td>
        <td> {pontosDeInteresse[ponto].approved} </td> 
        <td >
          <button type="button" class="btn btn-danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deletePontoDeInteresse(pontosDeInteresse[ponto].id, ponto)}}>Apagar</button>
          <button type="button" class="btn btn-info" onClick={() => this.editPontoDeInteresse(pontosDeInteresse[ponto].id)}>Editar</button>
          <button type="button" class="btn btn-success" onClick={() => this.detalhesPontoDeInteresse(pontosDeInteresse[ponto].id)}>Detalhes</button>
          <button type="button" class="btn btn-warning"  onClick = {() => {if (window.confirm('Are you sure you want to approve this route?'))this.aprovedBuildings(pontosDeInteresse[ponto].id, ponto)}}>Approve</button>
        </td>
      </tr>;

      items.push(i);
    };

    //Paginator TODO: mudar a cor dos botoes?
    const pagination=[];
    
    if(this.state.last_page!==1){
      //primeiro simbolo (<) existe?
      if(typeof this.state.current_page !== "undefined" && this.state.current_page !== 1){
          pagination.push(<li class="page-item">
                           <a class="page-link2" href="#" onClick={()=>this.getPontosDeInteresseList(this.state.current_page-1)}> &lt;</a>
                            </li>);
      };
      //numeros para as paginas. TODO: limitar o numero de quadrados possiveis
      console.log("lastpage",this.state.last_page);
      for(let i=1;i<=this.state.last_page;i++){
          pagination.push(<li class="page-item">
                           <a class="page-link2" href="#" onClick={()=>this.getPontosDeInteresseList(i)} >{i}</a>
                            </li>);
      };  
      //segundo simbolo (>) existe?
      if(this.state.current_page !== this.state.last_page){
        pagination.push(<li class="page-item">
                         <a class="page-link2" href="#" onClick={()=>this.getPontosDeInteresseList(this.state.current_page+1)}>&gt;</a>
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
              <th scope="col">Aproved</th>
              <th scope="col">Apagar/Editar/Detalhes/Approve</th>
            </tr>

          </thead>
          <tbody>
            {items}
          </tbody>
        </table>

        <nav aria-label="Page navigation example" className="pageNavigation">
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
    });
    
  }

  aprovedBuildings (id, aproved) {
    if(id !=0)
    aproved =1;
    pontosDeInteresseApi.aprovedBuildings(id).then ((response) => {
        this.setState({aproved: ''
                     });
        this.refreshPage();         
    })
  }

  refreshPage(){
    window.location.reload();
}

  detalhesPontoDeInteresse (id){
      this.props.history.push('/PointsOfInterest/' + id + '/detalhes');
    /*  this.setState({aproved: ''
                });*/
    
  }

  deletePontoDeInteresse(id, index) {
    pontosDeInteresseApi.delete(id).then( (response) => {
      let aux = this.state.pontosDeInteresse;
      aux.splice(index,1);
      this.setState({pontosDeInteresse:aux});
  }).catch( (error) => {

  });
    console.log(id, index)
  }

  editPontoDeInteresse(id) {
    
      this.props.history.push('/PointsOfInterest/' + id + '/edit');

   
  }

}