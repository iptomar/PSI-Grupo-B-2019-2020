import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Register2 extends Component {
    render() {
        return (

            <div className="App">
            <div className="App__Aside"></div>
            <div className="App__Form">
              <div className="PageSwitcher">
              <NavLink to="/login2" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>        
                <NavLink exact to="/register2" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>        
              </div>
  
              <div className="FormTitle">
                  <NavLink to="/login2" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or 
                  <NavLink exact to="/register2" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>
              <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="name">Username</label>
                    <input type="text" id="name" className="FormField__Input" placeholder="Enter your username" name="name" />
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" />
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="password">Password</label>
                    <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" />
                </div>
                <div className="FormField">
                    <label className="FormField__CheckboxLabel">
                        <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                    </label>
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button> <Link to="/login2" className="FormField__Link">I'm already a member</Link>
                </div>
                </form>
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

export default Register2;