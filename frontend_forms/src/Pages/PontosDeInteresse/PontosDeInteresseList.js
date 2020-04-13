import React, { Component } from 'react';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from '../../scripts/api/users';

export default class pontosDeInteresseList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "pontosDeInteresse": {}
    };

    usersApi.validateAuth(this.props);

    this.getPontosDeInteresseList();
  }

  render() {

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
        <td >
          <button type="button" class="btn btn-danger" onClick={() => this.deletePontoDeInteresse(pontosDeInteresse[ponto].id, ponto)}>Apagar</button>
          <button type="button" class="btn btn-info" onClick={() => this.editPontoDeInteresse(pontosDeInteresse[ponto].id)}>Editar</button>
        </td>
      </tr>;

      items.push(i);
    }
    console.log(items);

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
              <th scope="col">Apagar/Editar</th>
            </tr>

          </thead>
          <tbody>
            {items}
          </tbody>
        </table>

      </div>
    );
  }

  getPontosDeInteresseList() {
    pontosDeInteresseApi.list().then((response) => {
      this.setState({ pontosDeInteresse: response.data });
    });
  }

  deletePontoDeInteresse(id, index) {
    console.log(id, index);
  }

  editPontoDeInteresse(id) {
    console.log(id);
  }

}