import React, { Component } from 'react';
import ErrorAlert from '../views/Global/ErrorAlert';
import { Link, NavLink } from 'react-router-dom';
import usersApi from '../scripts/api/users';


class Login2 extends Component {

  constructor(props){
    super(props);
    this.state={email:'', password:'',errors:[]};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  render() {
    return (
      <div className="App">
        <div className="App__Aside"></div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink to="/login2" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Login</NavLink>
          </div>

          <div className="FormTitle">
            <NavLink to="/login2" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink>
          </div>
          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handlePasswordChange}  />
              </div>

              <div className="FormField">
            
               <button className="FormField__Button mr-20" onClick={this.handletestClick}>Login</button> <Link to="/register2" className="FormField__Link">Create an account</Link>
               <hr></hr>
               
               
              </div>
            </form>

            <ErrorAlert errors={this.state.errors}/>

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
  handleSubmit(e){
      e.preventDefault();
      usersApi.login(this.state.email,this.state.password).then( (response) => {
        localStorage.setItem("auth.token", response.token);
      }).catch( (error) => {
        this.setState({errors:error});
      });
  }



  handletestClick(e){
      e.preventDefault();
      usersApi.apiMe(); /*.then((response) => {
        localStorage.getItem("auth.token");
      }).catch((error) => {
        this.setState({errors:error});
      })*/
  }

  //get forms email
  handleEmailChange(e){
    this.setState({email:e.target.value});
  }

  //get forms password
  handlePasswordChange(e){
      this.setState({password:e.target.value});
  }



}

export default Login2;
