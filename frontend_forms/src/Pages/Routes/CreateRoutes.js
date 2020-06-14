import React, { Component } from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from "../../scripts/api/users";
import AsyncSelect from 'react-select/async';

class CreateRoutes extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameRoute: '', pointsOfInteresPage: 1, pointsOfInteresPageMax: 99, pointsOfInteresList: {}, selectedPointsOfInterest:null, pointsOfInterest: [],
            errors: []
        };

        usersApi.validateAuth(this.props);

        this.handleNameRoute = this.handleNameRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePointsOfInterestChange = this.handlePointsOfInterestChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

    }

    render(){


        const options = [];

        return(
        <div className="fundo" >
				<form className="needs-validation" onSubmit={this.handleSubmit}>
					<h1 className="text-center"><span className="font-weight-bold">Create Routes</span></h1>
					<div className="form-group row">
						<label for="nameRoute"><b>Name</b></label>
						<input className="form-control" type="text" placeholder="Insert name..." name="nameRoute" id="nameRoute" required />
					</div>
					<div className="form-group row">
						<label for="pontos"><b>Points Of Interest</b></label>
					</div>
                    <div>
                        <div>
                            <AsyncSelect
                                isMulti
                                cacheOptions
                                defaultOptions
                                loadOptions={this.getOptions}
                                onChange={this.handlePointsOfInterestChange}
                            />
                        </div>
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
        alert("Are you sure you wish to create this route?");
        if(this.handleValidation()){
        roteirosApi.create(document.getElementById("nameRoute").value,this.state.pointsOfInterest).then((response) => {
            this.props.history.push('/Routes');
        })
        alert("Form submitted");
    
        }else{

        alert("Form has errors.")

        }
    }

    getOptions(input){
        return pontosDeInteresseApi.list(1,input).then((response) => {

            let data=response.data;
            let res = data.map(building => ({ value: building.id, label: building.buildingName }));

            console.log(res);

            return res;

        });
    }

    handleNameRoute(e){
        e.preventDefault();
        this.setState({nameRoute:e.target.value});
    }

    handleValidation(){
        let nameR = document.getElementById("nameRoute").value;
        let formIsValid = true;

        console.log(nameR);

        //Name
        if(!nameR){
           formIsValid = false;
           console.log("Cannot be empty");
        }

        if(nameR !== "undefined"){
           if(!nameR.match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              console.log("Only letters");
           }        
        }
       return formIsValid;
    }


    handlePointsOfInterestChange(selectedOptions) {

        let buildings=[];

        for(let k in selectedOptions){
            buildings.push(selectedOptions[k].value);
        }

        this.setState({pointsOfInterest: buildings});
    }

}

export default CreateRoutes;