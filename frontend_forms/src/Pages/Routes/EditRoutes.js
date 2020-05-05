import React, {PropTypes, Component} from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';
import usersApi from "../../scripts/api/users";

class EditRoutes extends Component {
    constructor(props){
        super(props);

        let routesId = props.match.params.RoutesId;


        this.state = {
            routesid: routesId,
            nameRoute: null,
            errors: []
        };

        usersApi.validateAuth(this.props);

        this.getRoutesId(routesId);

        this.handleNameRoute = this.handleNameRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    render(){
        return(
            <div className="fundo" >
            <form className="needs-validation" onSubmit={this.handleSubmit}>
                <h1 className="text-center"><span className="font-weight-bold">Edit Routes</span></h1>
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

    getRoutesId(id){

        roteirosApi.get(id).then( (response) => {

            this.setState({nameRoute:response.nameRoute});

        }).catch( (error) => {
            console.log(error);

        });
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("xpto");
        //console.log(this.state.nameRoute);

        roteirosApi.update(this.state.routesid, this.state.nameRoute).then((response) => {
           this.props.history.push('/Routes');
           console.log("ola puto");
           // console.log(response);
        }).catch( (error) => {
            console.log(error);
            this.setState({errors:error});
        });

    }

    handleNameRoute(e){
        e.preventDefault();
        this.setState({nameRoute:e.target.value});
    }


}

export default EditRoutes;