import React, {PropTypes, Component} from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from "../../scripts/api/users";
import authorsApi from "../../scripts/api/authors";

class AuthorsEdit extends Component {
    constructor(props){
        super(props);

        let authorId = props.match.params.AuthorsId;


        this.state = {
            authorid: authorId,
            nameAuthor: null,
            errors: []
        };

        usersApi.validateAuth(this.props);

        this.getAuthorsId(authorId);

        this.handleNameAuthor = this.handleNameAuthor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
       
    }
    render(){
        return(
            <div className="fundo" >
            <form className="needs-validation" onSubmit={this.handleSubmit}>
                <h1 className="text-center"><span className="font-weight-bold">Edit Author</span></h1>
                <div className="form-group row">
                    <label for="nameAuthor"><b>Name</b></label>
                    <input className="form-control" type="text" placeholder="Insert name..." name="nameAuthor" id="nameAuthor" value={this.state.nameAuthor} onChange={this.handleNameAuthor} required />
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

    getAuthorsId(id){

        authorsApi.get(id).then( (response) => {

            this.setState({nameAuthor:response.author.name});

        }).catch( (error) => {
            console.log(error);

        });
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("teste ole");
        //if(this.handleValidation()){
        authorsApi.update(this.state.authorid, this.state.nameAuthor).then((response) => {
           this.props.history.push('/Authors');
           console.log("ola puto");
        }).catch( (error) => {
            console.log(error);
            this.setState({errors:error});
        });
            
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
           console.log("Cannot be empty");
        }

        if(nameAuth !== "undefined"){
           if(!nameAuth.match(/^[a-zA-Z_.,áãàâÃÀÁÂÔÒÓÕòóôõÉÈÊéèêíìîÌÍÎúùûçÇ!-.? ]+$/)){
              formIsValid = false;
              console.log("Only letters");
           }        
        }
       return formIsValid;
    }

}

export default AuthorsEdit;