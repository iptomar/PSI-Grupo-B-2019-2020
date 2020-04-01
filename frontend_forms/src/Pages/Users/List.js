import React, {PropTypes, Component} from 'react';
import usersApi from "../../scripts/api/users";

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

        const pagination=[];

        const users=this.state.users;

        for(let user in users){

                let i=<tr style={{
                    textAlign:"center"
                  }}key={user}>
                    <td>{users[user].id}</td>
                    <td>{users[user].name}</td>
                    <td>{users[user].email}</td>
                    <td>{users[user].created_at}</td>
                    <td>{users[user].updated_at}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onClick={() => this.deleteUser(users[user].id,user)}>Apagar</button>
                        <button type="button" class="btn btn-info" onClick={() => this.editUser(users[user].id)}>Editar</button>
                    </td>
                </tr>;

                items.push(i);


        }

        //Paginator
        if(this.last_page!==1){

            console.log(this.current_page);


            if(typeof this.current_page !== "undefined" && this.current_page !== 1){
                pagination.push(<li onClick={()=>this.getUsersList(this.current_page-1)}>&lt;</li>);
            }

            for(let i=1;i<=this.last_page;i++){
                pagination.push(<li onClick={()=>this.getUsersList(i)}>{i}</li>);
            }

            if(this.current_page !== this.last_page){
                pagination.push(<li onClick={()=>this.getUsersList(this.current_page+1)}>&gt;</li>);
            }

        }

        return (
            <div>
                <table>
                    <thead>
                        <tr style={{
                        textAlign:"center"
                      }}>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Data criação</th>
                            <th>Data atualização</th>
                            <th> </th>
                        </tr>

                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>

                <div class="pagination">
                    <ul>
                        {pagination}
                    </ul>
                </div>

            </div>
        );
    }

    getUsersList(page){

        if(page < 1){ page=1; }
        if(this.last_page !== null && page > this.last_page){ page=this.last_page; }

        usersApi.list(page).then( (response) => {
            this.setState({users:response.data,current_page:response.current_page,last_page:response.last_page});
            console.log(this.state);
        });

    }

    deleteUser(uid,index){
        usersApi.delete(uid).then( (response) => {
            this.setState({users:this.state.users.splice(index-1,1)});
        }).catch( (error) => {

        });
    }

    editUser(uid){
        this.props.history.push('/users/'+uid+'/edit');
    }
}