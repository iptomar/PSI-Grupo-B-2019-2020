import React, { Component } from 'react';
import usersApi from '../../scripts/api/users';
import authorsApi from '../../scripts/api/authors';
import './Authors.css';

export default class AuthorsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "authors": {},
            "current_page":1,
            "last_page":null
        };

        usersApi.validateAuth(this.props);
        //this.deleteAuthor(61);
        this.getAuthorsList(1);
    }

    render() {

        // PAGINACAO
        const pagination = [];
        if (this.state.last_page !== 1) {
            if(typeof this.state.current_page !== "undefined" && this.state.current_page !== 1) {
                pagination.push(<li className="page-item"><a className="page-link2" href="#" onClick={() => this.getAuthorsList(this.state.current_page-1)}>&lt;</a></li>)
            };

            //numeros para as paginas
            console.log("lastpage", this.state.last_page);
            for( let i = 1; i <= this.state.last_page; i++) {
                pagination.push(<li className="page-item">
                                    <a className="page-link2" href="#" onClick={() => this.getAuthorsList(i)}> {i} </a>
                                </li>);
            };

            if (this.state.current_page !== this.state.last_page) {
                pagination.push(<li className="page-item">
                                    <a className="page-link2" href="#" onClick={() => this.getAuthorsList(this.state.current_page + 1)}>&gt;</a>
                </li>);
            };
        }

        let items = [];
        const authors = this.state.authors;
        for( let author in authors) {
            let i = <tr style = {{
                textAlign: "center"
            }} key = {authors}>
                <td> {authors[author].id} </td>
                <td> {authors[author].name} </td>   
                <td>
                    <button type="button" class="btn btn-danger" onClick = {() => {if(window.confirm('Are you sure you wish to delete this item?'))this.deleteAuthor(authors[author].id, author)}}>Delete</button>
                    <button type="button" class="btn btn-info" onClick = {() => this.editAuthor(authors[author].id)}>Edit</button>
                    <button type="button" class="btn btn-success" onClick = {() => this.detalhesAuthor(authors[author].id, author)}>Detalhes</button>
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
                                <th scope = "col">Name</th>
                                <th scope = "col">Delete/Edit/Details</th>
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
            </div>
        );
    }

    getAuthorsList(page) {
        if(page < 1) {
            page = 1;
        };
        if(this.last_page !== null && page > this.last_page) {
            page = this.last_page;
        };
        authorsApi.list(page).then( (response) => {
            this.setState({
                    authors:response.data,
                    current_page:response.current_page,
                    last_page:response.last_page
                });
            console.log('ola', this.state.authors);
        })
    }

    deleteAuthor(id, index) {
      
       authorsApi.delete(id).then( (response) => {
       /* var array = [...this.state.author]; // make a separate copy of the array
        var index = array.indexOf(index);
        if (index !== -1) {
          array.splice(index, 1);}
          this.setState({authors: array});*/
            let aux = this.state.authors;
            aux.splice(index, 1);
            this.setState({authors:aux});
            console.log(this.state.authors);
            this.refreshPage();
        }).catch( (error) => {

        });
        console.log(id, index);
    }

    refreshPage(){
        window.location.reload();
    }
    
    detalhesAuthor (id, index){
        authorsApi.get(id).then((response) => {
            sessionStorage.setItem("author", JSON.stringify(this.state.authors[index]));
            this.props.history.push('/authors/' + id + '/detalhes');
            this.setState({redirect: true,
                           name: ''
                 });
        })
        console.log(sessionStorage.getItem("author"));

    }

    editAuthor(id) {
        this.props.history.push('/authors/' + id + '/edit');
    } 
}