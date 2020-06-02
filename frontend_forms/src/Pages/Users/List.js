import React, {PropTypes, Component} from 'react';
import usersApi from "../../scripts/api/users";
import './List.css';

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "users":{},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);

        this.getUsersList(1);
    }

    render() {

        let items=[];

        const users=this.state.users;

        for(let user in users){

                let i=<tr style={{
                    textAlign:"center"
                  }}key={user}>
                    <td >{users[user].id}</td>
                    <td >{users[user].name}</td>
                    <td >{users[user].email}</td>
                    <td >{users[user].created_at}</td>
                    <td >{users[user].updated_at}</td>
                    <td >                                                   
                        <button type="button" class="btn btn-danger" onClick={() => {if (window.confirm('Tem a certeza que deseja apagar este utilizador?'))this.deleteUser(users[user].id,user)}}>Apagar</button>
                        <button type="button" class="btn btn-info" onClick={() => this.editUser(users[user].id)}>Editar</button>
                    </td>
                </tr>;

                items.push(i);


        }

        //Paginator
        const pagination=[];
        
        if(this.last_page!==1){

            if(typeof this.state.current_page !== "undefined" && this.state.current_page !== 1){
                pagination.push(<li class="page-item">
                                 <a class="page-link2" href="#" onClick={()=>this.getUsersList(this.state.current_page-1)}> &lt;</a>
                                 </li>);
            }

            for(let i=1;i<=this.state.last_page;i++){
                pagination.push(<li class="page-item">
                <a class="page-link2" href="#" onClick={()=>this.getUsersList(i)} >{i}</a>
                 </li>);
            }

            if(this.state.current_page !== this.state.last_page){
                pagination.push(<li class="page-item">
                                <a class="page-link2" href="#" onClick={()=>this.getUsersList(this.state.current_page+1)}>&gt;</a>
                                </li>);
            }

        };

        return (

            <div className="stuff">
                <table className="table table-hover table-dark table-striped rounded" id="users">
                <caption>Lista de utilizadores</caption>
                    <thead>
                        <tr style={{
                        textAlign:"center"
                      }}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Data criação</th>
                            <th scope="col">Data atualização</th>
                            <th scope="col">Apagar/Editar</th>
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

    getUsersList(page){

        if(page < 1){ page=1; }
        if(this.last_page !== null && page > this.last_page){ page=this.last_page; }

        usersApi.list(page).then( (response) => {
            this.setState({users:response.data,
                        current_page:response.current_page,
                        last_page:response.last_page});
        });

    }

    deleteUser(uid,index){
        usersApi.delete(uid).then( (response) => {
            let aux = this.state.users;
            aux.splice(index,1);
            this.setState({users:aux});
        }).catch( (error) => {

        });
    }

    editUser(uid){
        this.props.history.push('/users/'+uid+'/edit');
    }
}