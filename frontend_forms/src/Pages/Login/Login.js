import React, { Component } from 'react';
import './login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component{
  render(){
    return(
      <Form className="login-form"> 
      <h1 className ="text-center"><span className="font-weight-bold">LOGIN</span></h1>
      <h4 className ="text-center">Welcome</h4>
      <FormGroup>
        <Label for ="email"><b>Email</b></Label>
        <Input class="form-control" type="email" placeholder="Email" name="email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="password"><b>Password</b></Label>
        <Input class="form-control" type="password" placeholder="Password" name="password" required/>
      </FormGroup>
      <hr class="mb-3"></hr>
      <Button className="btn-lg btn-dark btn-block" type="submit" name="create">
        Log in
      </Button>
    </Form>
    );
    
  }
}

export default Login;