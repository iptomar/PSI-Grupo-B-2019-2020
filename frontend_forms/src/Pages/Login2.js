import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Login2 extends Component {
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
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" />
              </div>

              <div className="FormField">
                <button className="FormField__Button mr-20">Sign In</button> <Link to="/register2" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>          </div>
      </div>
    );
  }

  /**
   * Faz o login no servidor e retorna o resultado.
   * @param {*} auth Objeto do tipo 
   * {
   * email: ......,
   * password: ......
   * }
   */
  async login(auth) {
    let resposta;

    resposta = await fetch(
        "http://psi2020.tugamars.com/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auth)
        }
    );

    if (resposta.ok)
        return await resposta.json();
    else
        throw resposta;
  }
}

export default Login2;