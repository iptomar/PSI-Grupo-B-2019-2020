import React, { Component } from 'react';
import './CriarPontosInteresse.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class CriarPontosInteresse extends Component{
    render(){
    return(
      <Form className="needs-validation" noValidate> 
        <h1 className ="text-center"><span className="font-weight-bold">Create Points of Interest</span></h1>
        <div className="form-group row">
            <Label for ="title"><b>Title</b></Label>
            <Input className="form-control" type="text" placeholder="Insert title..." name="title" required/>
        </div>
        <div className="form-group row">
            <Label for="description"><b>Description</b></Label>
            <textarea className="form-control" id="description" name="description" rows="3" placeholder="Add a description about the point of interest."></textarea>
       </div>

        <div className="form-group row">
            <Label for="images"><b>Images</b></Label>
            <div className="custom-file">
                <input type="file" multiple className="custom-file-input"/>
                <label class="custom-file-label" for="customFile">Choose file...</label>
            </div>
       </div>
       <div className="form-group row">
            <Label for="coordenates"><b>Coordenates</b></Label>
        </div>

        <div className="form-group row">
            <div className="form group col-md-6">
                <Label for="latitude"><b>Latitude</b></Label>
                <Input className="form-control" type="number" placeholder="Insert latitude..." name="latitude" required/>
            </div>
            <div class="form-group col-md-6">
                <label for="longitude"><b>Longitude</b></label>
                <Input className="form-control" type="number" placeholder="Insert longitude..." name="longitude" required/>
            </div>
        </div>
        <div className="form-group col"></div>
        <hr class="mb-3"></hr>
        <Button className="btn-lg btn-dark btn-block" type="submit" name="create">
            Submit
        </Button>
     </Form>
    );
 
  }
}

export default CriarPontosInteresse;