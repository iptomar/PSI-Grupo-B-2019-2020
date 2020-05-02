import React, { Component } from 'react';
import ErrorAlert from '../../views/Global/ErrorAlert';
import roteirosApi from '../../scripts/api/roteiros';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';

class CreateRoutes extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameRoute: '', pointsOfInteresPage: 1, pointsOfInteresPageMax: 99, pointsOfInteresList: {}, selectedPointsOfInterest:null, pointsOfInterest: [],
            errors: []
        } 

        this.handleNameRoute = this.handleNameRoute.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addPointsOfInterest = this.addPointsOfInterest.bind(this);
        this.handlePointsOfInterestChange = this.handlePointsOfInterestChange.bind(this);

        this.getPointsOfInterest(1);
    }

    render(){

        let listaPointOfInterest = [];
        const pontosDeInteresse = this.state.pointsOfInterest;
        for( let ponto in pontosDeInteresse) {
            let i = <tr style = {{ textAlign: "center"}}
                        key = {"ponto" + ponto}>
                            <td>{this.state.pointsOfInteresList[pontosDeInteresse[ponto]].buildingName}</td>
                    <td>
                        <button type="button" class="btn btn-danger" onClick={() => this.deletePointOfInterest(ponto)}>Delete</button>
                    </td>
            </tr>
        listaPointOfInterest.push(i);
        console.log(pontosDeInteresse);
        };


        const options = [];
        const pontosDeInteresseExistentes = this.state.pointsOfInteresList;
        let p;
        for( let ponto in pontosDeInteresseExistentes) {
            p = <option value={pontosDeInteresseExistentes[ponto].id}>{pontosDeInteresseExistentes[ponto].buildingName}</option>
            options.push(p);
        };

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
                    <div className="tabelaPontos">
						<table className="table table-hover table-dark table-striped rounded" id="pontosDeInteresseExistentes">
							<thead>
								<tr style={{
									textAlign: "center"
								}}>
									<th scope="col" >Ponto de Interesse</th>
								</tr>
							</thead>
							<tbody>
								{listaPointOfInterest}
							</tbody>
						</table>
                    </div>
                    <div>
						<button type="submit" value="submit" onClick={this.addPointsOfInterest}>Add point</button>
						<select onChange={this.handlePointsOfInterestChange}>
							{options}
						</select>
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

    handlePointsOfInterestChange(e) {
        this.setState({selectedPointsOfInterest: e.target.value});
    }

    addPointsOfInterest(e) {
        e.preventDefault();
        if(this.state.selectedPointsOfInterest !== null) {
            this.setState({
                pointsOfInterest: [...this.state.pointsOfInterest, this.state.selectedPointsOfInterest]
            });
        }
    }

    getPointsOfInterest(page) {
        pontosDeInteresseApi.list(page).then((response) => {
            let arrayFinal = {};

            for(let k in response.data) {
                console.log("teste");
                if(response.data.hasOwnProperty(k)) {
                    arrayFinal[response.data[k].id] = response.data[k];
                }
            }

            this.setState({
                pointsOfInteresList: arrayFinal, 
                                    pointsOfInteresPage: response.current_page, 
                                    pointsOfInteresPageMax: response.last_page
            });
        });
    }

    deletePointOfInterest(index) {
        let aux1 = this.state.pointsOfInterest;
        aux1.splice(index,1);
        this.setState({pointsOfInterest:aux1});
    }

}

export default CreateRoutes;