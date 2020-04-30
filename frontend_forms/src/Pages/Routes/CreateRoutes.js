import React, { Component } from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';


class CreateRoutes extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameRoute: '',
            errors: []
        }

        this.handleNameRoute = this.handleNameRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
        <div className="fundo" >
				<form className="needs-validation" onSubmit={this.handleSubmit}>
					<h1 className="text-center"><span className="font-weight-bold">Create Routes</span></h1>
					<div className="form-group row">
						<label for="nameRoute"><b>Name</b></label>
						<input className="form-control" type="text" placeholder="Insert name..." name="nameRoute" value={this.state.nameRoute} onChange={this.handleNameRoute} required />
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
        console.log(this.state.nameRoute);
        roteirosApi.create(this.state.nameRoute).then((response) => {
            console.log(response);
        })

    }

    handleNameRoute(e){
        e.preventDefault();
        this.setState({nameRoute:e.target.value});
    }

}

export default CreateRoutes;