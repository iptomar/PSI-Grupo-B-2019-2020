import React, { Component } from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import authorsApi from '../../scripts/api/authors';
import usersApi from '../../scripts/api/users';

class CreateAuthors extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameAuthor: '',
            errors: [],
        }

        usersApi.validateAuth(this.props);
        this.handleNameAuthor = this.handleNameAuthor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    render(){
        return(
        <div className="fundo" >
                <form className="needs-validation" onSubmit={this.handleSubmit}>
                    <h1 className="text-center"><span className="font-weight-bold">Create Authors</span></h1>
                    <div className="form-group row">
                        <label for="nameAuthor"><b>Name</b></label>
                        <input className="form-control" type="text" placeholder="Insert name..." name="nameAuthor" id="nameAuthor"  required />
                    </div>
                    <div className="form-group col"></div>
                    <hr class="mb-3"></hr>
                    <button className="btn-lg btn-dark btn-block" type="submit" value="submit" onClick={this.handleSubmit} name="create">
                        Submit
                </button>
                    <ErrorAlert errors={this.state.errors} />
                </form>
            </div>
        );
    }

    handleSubmit(e){
        e.preventDefault();
        //if(this.handleValidation()){
            authorsApi.create(document.getElementById("nameAuthor").value).then((response) => {
                console.log(response);
                
                this.props.history.push('/Authors');
                
                
            })
        //}else{
        //}



    }

    handleNameAuthor(e){
        e.preventDefault();
        this.setState({nameAuthor:e.target.value});
    }

    handleValidation(){
        let nameAuth = document.getElementById("nameAuthor").value;
        let formIsValid = true;

        console.log(nameAuth);

        //Name
        if(!nameAuth){
           formIsValid = false;
           window.alert("Cannot be empty");
        }

        if(nameAuth){

           if(!nameAuth.match(/^[a-zA-Z_.,áãàâÃÀÁÂÔÒÓÕòóôõÉÈÊéèêíìîÌÍÎúùûçÇ!-.? ]+$/)){

              formIsValid = false;
              window.alert("Only letters");
           }        
        }
       return formIsValid;
    }

}

export default CreateAuthors;
