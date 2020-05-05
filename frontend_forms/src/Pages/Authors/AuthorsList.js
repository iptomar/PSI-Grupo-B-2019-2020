import React, { Component } from 'react';
import usersApi from '../../scripts/api/users';
import authorsApi from '../../scripts/api/authors';

export default class AuthorsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "authors": {},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);

        this.getAuthorsList();
    }

    render() {

        let items = [];
        const authors = this.state.authors;
        for( let author in authors) {
            let i = <tr style = {{
                textAlign: "center"
            }} key = {authors}>
                <td> {authors[author].id} </td>
                <td> {authors[author].name} </td>   
                <td>
                    <button type="button" class="btn btn-danger"  onClick = {() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deleteAuthor(authors[author].id, author)}}>Delete</button>
                    <button type="button" class="btn btn-info"  onClick = {() => this.editAuthor(authors[author].id)}>Edit</button>
                </td>            
            </tr>;

            items.push(i);
        }
        console.log(items);

        return (
            <div>
                <div className="stuff">
                    <table className = "table table-hover table-dark table-striped rounded" id="authors">
                        <caption>Lista de Autores</caption>
                        <thead>
                            <tr style = {{ textAlign: "center" }}>
                                <th scope = "col">ID</th>
                                <th scope = "col">Nome</th>
                                <th scope = "col">Apagar/Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    getAuthorsList() {
        authorsApi.list().then( (response) => {
            this.setState({authors:response.data});
            console.log(this.state);
            this.setState({authors:response.data});
            console.log('ola', this.state.authors)
        })
    }

    deleteAuthor(id, index) {
        authorsApi.delete(id).then( (response) => {
            let i = this.state.authors;
            console.log('aux', i);
            i.splice(index, 1);
            console.log('aux', i);
            this.setState({authors:i});
            console.log(this.state.authors);
        }).catch( (error) => {
            console.log("fizeste asneira" + error);

        });
        console.log(id, index);
    }

    editAuthor(id) {
        this.props.history.push('/authors/' + id + '/edit');
    } 
}