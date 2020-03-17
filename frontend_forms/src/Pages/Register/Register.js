import React, { Component } from 'react';
import './register.css';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import { Button } from 'react-bootstrap';

class Register extends Component {
  render(){
    return(
      <Form className="registration-form"> 
      <h1 className ="text-center"><span className="font-weight-bold">Register</span></h1>
      <h4 className ="text-center">Welcome</h4>
      <FormGroup>
        <Label for="fistname"><b>First Name</b></Label>
        <Input class="form-control" type="text" name="firstname" required />
      </FormGroup>
      <FormGroup>
        <Label for="lastname"><b>Last Name</b></Label>
        <Input class="form-control" type="text" name="lastname" required />
      </FormGroup>
      <FormGroup>
        <Label for="email"><b>Email</b></Label>
        <Input class="form-control" type="email" name="email" required />
      </FormGroup>
      <FormGroup>
        <Label for="password"><b>Password</b></Label>
        <Input class="form-control" type="password" name="password" required />
      </FormGroup>
      <FormGroup>
        <Label for="password"><b>Confirm Password</b></Label>
        <Input class="form-control" type="password" name="password" required />
      </FormGroup>
      <hr class="mb-3"></hr>
      <Button className="btn-lg btn-dark btn-block" type="submit" name="create">
        Sign In
      </Button>
    </Form>
    );
  }
}

export default Register;