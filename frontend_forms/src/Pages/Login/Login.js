import React, { Component } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: ''

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  /*evento do botão para log in */
  handleChange(event){
    this.setState({value: event.target.value});
  }

  /*evento para o form */
  handleSubmit(event){
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  /* faz o post /api/login */
  async postData(){
    console.log('ola');
    try{
       let result = await fetch('http://psi2020.tugamars.com/api/login', {
            method: 'post',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              email: 'admin@admin.com',
              password: 'password'
            })
       });
       console.log(result)

  }catch (e) {
    console.log(e)

     }
  }

  render(){
    return(
      <div>
      <Form className="login-form" onSubmit={this.handleSubmit}> 
      <h1 className ="text-center"><span className="font-weight-bold">LOGIN</span></h1>
      <h4 className ="text-center">Welcome</h4>
      <FormGroup>
        <Label for ="email"><b>Email</b></Label>
        <Input className="form-control" type="email" placeholder="Email" name="email" required value={this.state.value} onChange={this.handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="password"><b>Password</b></Label>
        <Input className="form-control" type="password" placeholder="Password" name="password" required  />
      </FormGroup>
      <hr className="mb-3"></hr>
      <Button className="btn-lg btn-dark btn-block" type="submit" value="Submit" onClick = {() => this.postData()} >
        Log in
      </Button>
    </Form>
  
    </div>
     
    );
    
  }
}

export default Login;