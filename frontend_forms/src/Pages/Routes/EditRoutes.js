import React, { Component } from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import usersApi from "../../scripts/api/users";
import AsyncSelect from 'react-select/async';

class CreateRoutes extends Component {
    constructor(props){
        super(props);

        let routesId = props.match.params.RoutesId;

        this.state = {
            routeId:routesId,
            nameRoute:null,
            pointsOfInterest:[],
            pi:[],
            errors: []
        };

        usersApi.validateAuth(this.props);
        this.getPontoByID(routesId);

        this.handleNameRoute = this.handleNameRoute.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePointsOfInterestChange = this.handlePointsOfInterestChange.bind(this);
        this.deletePontoDeInteresse=this.deletePontoDeInteresse.bind(this);

    }

    render(){


        let items = [];
        const pontosDeInteresse = this.state.pi;
        console.log('render',this.state.pi);
        for (let ponto in pontosDeInteresse) {

            let i = <tr style={{
                textAlign: "center"
            }} key={ponto}>
                <td >{pontosDeInteresse[ponto].id}</td>
                <td >{pontosDeInteresse[ponto].buildingName}</td>
                <td >{pontosDeInteresse[ponto].location}</td>
                <td >{pontosDeInteresse[ponto].dates}</td>
                <td >
                    <button type="button" class="btn btn-danger" onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))this.deletePontoDeInteresse(pontosDeInteresse[ponto].id, ponto)}}>Apagar</button>
                </td>
            </tr>;

            items.push(i);
        };

        const options = [];

        return(
            <div className="fundo" >
                <form className="needs-validation" onSubmit={this.handleSubmit}>
                    <h1 className="text-center"><span className="font-weight-bold">Create Routes</span></h1>
                    <div className="form-group row">
                        <label for="nameRoute"><b>Name</b></label>
                        <input className="form-control" type="text" placeholder="Insert name..." name="nameRoute" value={this.state.nameRoute} onChange={this.handleNameRoute} required />
                    </div>
                    <div className="form-group row">
                        <label for="pontos"><b>Points Of Interest</b></label>
                    </div>

                    <div>
                        <table className="table table-hover table-dark table-striped rounded" id="pontosDeInteresse">
                            <thead>
                            <tr style={{
                                textAlign: "center"
                            }}>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Localização</th>
                                <th scope="col">Data</th>
                                <th scope="col">Apagar</th>
                            </tr>

                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>

                    <h3>Adicionar PI</h3>
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
        console.log(this.state.nameRoute);
        roteirosApi.update(this.state.routeId,this.state.nameRoute,this.state.pointsOfInterest).then((response) => {
            this.props.history.push('/Routes');
        })

    }

    getOptions(input){
        console.log("Get options - 1");
        return pontosDeInteresseApi.list(1,input).then((response) => {
            console.log("Get options - 2");

            let data=response.data;

            let res = [];
            let ids=[];

            for(let k in data){

                res.push({value:data[k].id,label: data[k].buildingName});
                ids.push(data[k].id);

            }

            console.log("getoptions - 3");
            console.log(res);

            return res;

        });
    }

    handleNameRoute(e){
        e.preventDefault();
        this.setState({nameRoute:e.target.value});
    }

    handlePointsOfInterestChange(selectedOptions) {

        console.log("PI CHANGE");
        console.log(selectedOptions);

        let buildings=this.state.pointsOfInterest;

        for(let k in selectedOptions){
            buildings.push(selectedOptions[k].value);
        }

        this.setState({pointsOfInterest: buildings});
    }

    getPontoByID(id) {
        roteirosApi.get(id).then( (response) => {

            this.setState({nameRoute:response.route.name});

            this.setState({pi:response.route.buildings});

            let buildings=[];

            for(let k in response.route.buildings){
                buildings.push(response.route.buildings[k].id);
            }

            this.setState({pointsOfInterest:buildings});

        }).catch( (error) => {

        });
    }

    deletePontoDeInteresse(id,index){
        console.log(this.state.pointsOfInterest);

        let aux = this.state.pointsOfInterest;
        let i = aux.indexOf(id);
        console.log("indexof",i);
        aux.splice(i,1);
        console.log("auxiliar",aux);
        this.setState({pointsOfInterest:aux});

        let auxpi=this.state.pi;
        auxpi.splice(index,1);
        this.setState({pi:auxpi});

    }

}

export default CreateRoutes;