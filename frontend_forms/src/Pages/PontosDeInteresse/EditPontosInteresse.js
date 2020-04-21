import React, {PropTypes, Component} from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';

export default class EditPontosInteresse extends Component {

    constructor(props) {
        super(props);

        let pontoInteresseID = props.match.params.pontoInteresseID;

        this.state = {
            pontointeresseid:pontoInteresseID,
            buildingName:null,
            local:null,
            date:null,
            errors:[]
        };

        pontosDeInteresseApi.get(this.props);
        this.getPontoByID(pontoInteresseID);

        this.handleBuildingNameChange = this.handleBuildingNameChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render () {
        return (
            <div className="fundo">
                <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
                    <h1 className ="text-center"><span className="font-weight-bold">Editar ponto de interesse</span></h1>
                    <div className="form-group row">
                        <label htmlFor="buildingName">Nome</label>
                        <input className="form-control" type="text" id="buildingName" name="buildingName" placeholder="Introduzir o nome" value={this.state.buildingName} onChange={this.handleBuildingNameChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="local">Localização</label>
                        <input className="form-control" type="text" id="local" name="local" placeholder="Introduza a localização" value={this.state.local} onChange={this.handleLocalChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="date">Data</label>
                        <input className="form-control" type="number" id="local" placeholder="Introduza a data" name="date" value={this.state.date} onChange={this.handleDateChange} />
                    </div>
                    <div>
                        <button className="button mr-20" >Update</button>
                    </div>
                    <ErrorAlert errors={this.state.errors}/>
                </form>
            </div>
        );
    }

    getPontoByID(id) {
        pontosDeInteresseApi.get(id).then( (response) => {
            this.setState({buildingName: response.buildingName});
        }).catch( (error) => {

        });
    }

    handleBuildingNameChange(e) {
        this.setState({ buildingName: e.target.value });
    }

    handleLocalChange(e) {
        this.setState( {local: e.target.value});
    }

    handleDateChange(e) {
        this.setState( { date: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let body = {
            buildingName: this.state.buildingName
        };

        if(this.state.local !== null) {
            body.local = this.state.local;
        }

        if(this.state.date !== null) {
            body.date = this.state.date;
        }

        pontosDeInteresseApi.edit(this.state.pontointeresseid,body).then ( (response) => {
            this.props.history.push('/PointsOfInterest');
        }).catch( (error) => {
            console.log(error);
            this.setState({errors:error});
        });
    }
}