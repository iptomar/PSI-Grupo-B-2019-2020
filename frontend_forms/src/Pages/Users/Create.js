import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import usersApi from '../../scripts/api/users';
import ErrorAlert from "../../views/Global/ErrorAlert";

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors:[]
        };
        // This binding is necessary to make `this` work in the callback
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //Validação de que o utilizador está logado
        usersApi.validateAuth(this.props);

    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    
    handlePasswordConfirmationChange(e){
        this.setState({password_confirmation: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        usersApi.register(this.state.email,this.state.name,this.state.password,this.state.password_confirmation).then( (response) => {
            this.props.history.push('/users');
        }).catch( (error) => {
            this.setState({errors:error});
        });

    };
    

    render() {
        return (

            <div className="App">


            <div className="App__Aside">
                <div className="fundoTitulo">
                     <h1 className="title_">IPT | RAM</h1>
                </div>
            </div>
            <div className="App__Form">
                    <h1>Register</h1>
                    <hr></hr>
                    <br></br>
                    <div className="FormCenter">
                        <form onSubmit={this.handleSubmit} className="FormFields">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="name">Username</label>
                                <input type="text" id="name" className="FormField__Input" placeholder="Enter your username" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password_confirmation">Password Confirmation</label>
                                <input type="password" id="password_confirmation" className="FormField__Input" placeholder="Re-enter your password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handlePasswordConfirmationChange} />
                            </div>
                            <div className="FormField">
                                <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login2" className="FormField__Link">I'm already a member</Link>
                            </div>
                        </form>

                        <ErrorAlert errors={this.state.errors}/>
                    </div>
                </div>
            </div>

        );
    }

    /**
   * Faz o registo no servidor e retorna o resultado.
   * @param {*} auth Objeto do tipo 
   * {
   * email: ......,
   * name: .......,
   * password: ......,
   * password_confirmation: .......
   * }
   * @param {String} token token do utilizador retornado pelo /api/login
   */
    async register(body, token) {
        let resposta;
        resposta = await fetch(
            "http://psi2020.tugamars.com/api/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            }
        );

        if (resposta.status === 201)
            return await resposta.json();
        else
            throw resposta;
    }
}

export default Create;