import React, {Component} from 'react';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from '../../scripts/api/users';

export default class pontosDeInteresseList extends Component {

  constructor(props) {
    super(props);

    this.state = {
        "pontosDeInteresse":{},
        "current_page":1,
        "last_page":null
    };

    usersApi.validateAuth(this.props);

    this.getPontosDeInteresseList();
  }

  render(){
    return "<div>hello from pontosDeInteresseList</div>"
  }

  getPontosDeInteresseList(){
    pontosDeInteresseApi.list().then( (response) =>{
      this.setState({pontosDeInteresse:response.data});
      console.log(this.state);
    } );
  }


}