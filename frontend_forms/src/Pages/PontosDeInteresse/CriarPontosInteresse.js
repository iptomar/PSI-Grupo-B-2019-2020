import React, { Component } from 'react';
import './CriarPontosInteresse.css';
import ErrorAlert from '../../views/Global/ErrorAlert';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';
import roteirosApi from '../../scripts/api/roteiros';

import usersApi from "../../scripts/api/users";

import authorsApi from '../../scripts/api/authors'

import AsyncSelect from 'react-select/async';

class CriarPontosInteresse extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buildingName: '', location: '', dates: '', buildingType: '', description: '', coordinate1: '', coordinate2: '',
			auxImg:'', auxAuthor:'', auxDesc:'', auxCoordenada1: '', auxCoordenada2: '', auxOrder: '', auxNameAuthor: '', nameRoute:'',
			vertices: [], images: [], 
			authors: [], routes: [], routesPage: 1, routesPageMax: 99, routesList:{}, selectedRoute:null,
			errors: []
		};

        usersApi.validateAuth(this.props);

		this.handleBuildingNameChange = this.handleBuildingNameChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleDatesChange = this.handleDatesChange.bind(this);
		this.handleBuildingTypeChange = this.handleBuildingTypeChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleCoordinate1Change = this.handleCoordinate1Change.bind(this);
		this.handleCoordinate2Change = this.handleCoordinate2Change.bind(this);
		//this.handleVerticesChange = this.handleVerticesChange.bind(this);
		this.handleImagesChange = this.handleImagesChange.bind(this);
		//this.handleAuthorsChange = this.handleAuthorsChange.bind(this);
		//this.handleRoutesChange = this.handleRoutesChange.bind(this);
		this.handleVerticeCoordenada1Change = this.handleVerticeCoordenada1Change.bind(this);
		this.handleVerticeCoordenada2Change = this.handleVerticeCoordenada2Change.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
		this.handleOrderChange = this.handleOrderChange.bind(this);
		this.addImage = this.addImage.bind(this);
		this.handleImgDescChange = this.handleImgDescChange.bind(this);
		this.handleImgAuthorChange = this.handleImgAuthorChange.bind(this);
		this.addVertice = this.addVertice.bind(this);
		//this.listVertices = this.listVertices.bind(this);
		//this.getListVertice = this.getListVertice.bind(this);
		this.handleAuthorsChange = this.handleAuthorsChange.bind(this);
		//this.deleteAuthor = this.deleteAuthor.bind(this);
		this.addRoute = this.addRoute.bind(this);
		this.handleRouteChange = this.handleRouteChange.bind(this);

		this.getRoutes(1);
	}

	render() {


		let listaVertices = [];
		const vertices = this.state.vertices;

		for (let vertice in vertices){
			let i=<tr style={{
				textAlign:"center"
			  }}key={"vertice" + vertice}>
				<td >{vertices[vertice].coordinate1}</td>
				<td >{vertices[vertice].coordinate2}</td>
				<td >{vertices[vertice].order}</td>
				<td>
				<button type="button" class="btn btn-danger" onClick={() => this.deleteVertices(vertice)}>Delete</button>
				</td>
			</tr>;
			listaVertices.push(i);
			console.log(vertices);
		}

		let listaAutores = [];
		const autores = this.state.authors;
		for (let autor in autores){
			let i=<tr style={{
				textAlign:"center"
			  }}key={"autor" + autor}>
				<td >{autores[autor].name}</td>
				<td>
					<button type="button" class="btn btn-danger" onClick={() => this.deleteAuthor(autor)}>Delete</button>
				</td>
			</tr>;
			listaAutores.push(i);
			console.log(autores);
		};

	  let listaRotas = [];
		const rotas = this.state.routes;
		for (let rota in rotas){
			let i=<tr style={{
				textAlign:"center"
			  }}key={"rota" + rota}>
				<td >{this.state.routesList[rotas[rota]].name}</td>
				<td>
					<button type="button" class="btn btn-danger" onClick={() => this.deleteRoute(rota)}>Delete</button>
				</td>
			</tr>;
			listaRotas.push(i);
		}; 

		//Preparar a lista de imagens que já foram inseridas
		let listaImagens=[];
		const imagens=this.state.images;
		let i;
		for(let imagem in imagens){
			i=<tr style={{textAlign:"center"}} key={"imagem"+imagem}>
					<td>
						<img src={window.URL.createObjectURL(imagens[imagem].image)} height="100" />
					</td>
					<td >{imagens[imagem].sourceAuthor}</td>
					<td >{imagens[imagem].description}</td>
					<td >
							
							<button type="button" class="btn btn-danger" onClick={() => this.deleteImage(imagem)}>Apagar</button>
					</td>
			</tr>;
			listaImagens.push(i);
		};

		//preparar as opções do select 
		const options = [];
		const rotasExistentes = this.state.routesList;	
		let r;
		for(let rota in rotasExistentes){
			r=<option value={rotasExistentes[rota].id}>{rotasExistentes[rota].name}</option>
			options.push(r);
		};

		return (
			<div className="fundo" >
				<form className="needs-validation" onSubmit={this.handleSubmit}>
					<h1 className="text-center"><span className="font-weight-bold">Create Points of Interest</span></h1>
					<div className="form-group row">
						<label for="buildingName"><b>Building Name</b></label>
						<input className="form-control" type="text" placeholder="Insert building name..." name="buildingName" value={this.state.buildingName} onChange={this.handleBuildingNameChange} required />
					</div>
					<div className="form-group row">
						<label for="location"><b>Location</b></label>
						<input className="form-control" id="location" name="location" rows="3" placeholder="Add a location about the point of interest." value={this.state.location} onChange={this.handleLocationChange} required ></input>
					</div>
					<div className="form-group row">
						<label for="dates"><b>Date</b></label>
						<input className="form-control" type="number" id="dates" name="dates"  placeholder="Add the year." value={this.state.dates} onChange={this.handleDatesChange} required></input>
					</div>
					<div className="form-group row">
						<label for="buildingType"><b>Type</b></label>
						<input className="form-control" id="buildingType" name="buildingType" type="text" rows="3" placeholder="Add a type about the point of interest." value={this.state.buildingType} onChange={this.handleBuildingTypeChange} required></input>
					</div>
					<div className="form-group row">
						<label for="description"><b>Description</b></label>
						<input className="form-control" id="description" name="description" type="text" rows="3" placeholder="Add a description about the point of interest." value={this.state.description} onChange={this.handleDescriptionChange} required></input>
					</div>
					<div className="form-group row">
						<label for="coordenates"><b>Coordinates</b></label>
					</div>

					<div className="form-group row">
						<div className="form group col-md-6">
							<label for="coordinate1"><b>Coordinate 1</b></label>
							<input className="form-control" type="number" step="any" placeholder="Insert coordinate 1..." id="coordinate1" name="coordinate1" value={this.state.coordinate1} onChange={this.handleCoordinate1Change} required />
						</div>
						<div class="form-group col-md-6">
							<label for="coordinate2"><b>Coordinate 2</b></label>
							<input className="form-control" type="number" step="any" placeholder="Insert coordinate 2..." id="coordinate2" name="coordinate2" value={this.state.coordinate2} onChange={this.handleCoordinate2Change} required />
						</div>
					</div>

					<div className="form-group row">
						<label for="images_label"><b>Images</b></label>
					</div>
					{/* tabela com as imagens a enviar */}
					<div className="tabelaImagens">
						<table className="table table-sm table-dark table-striped rounded" id="users">
							<thead>
								<tr style={{
									textAlign: "center"
								}}>
									<th scope="col">Ficheiro</th>
									<th scope="col">Autor</th>
									<th scope="col">Descrição</th>
								</tr>
							</thead>
							<tbody>
								{listaImagens} 
							</tbody>
						</table>
					</div>
					<br/>
					<div className="custom-file">
						<label for="image" className="custom-file-label">Upload file...</label>
						<input type="file" className="custom-file-input" label='Upload' ref={(ref)=>this.fileUpload = ref} value={this.state.image} onChange={this.handleImagesChange} />
					</div>
					<br/><br/>
					<div className="form-group row">
						<label for="source_author"><b>Source Author</b></label>
						<input className="form-control" id="source_author" name="source_author" rows="3" placeholder="Add a source author about the point of interest." value={this.state.auxAuthor} onChange={this.handleImgAuthorChange} required></input>
					</div>
					<div className="form-group row">
						<label for="description_images"><b>Description</b></label>
						<input className="form-control" id="description_images" name="description_images" rows="3" placeholder="Add a description about the point of interest." value={this.state.auxDesc} onChange={this.handleImgDescChange} required></input>
						<button className="btn btn-primary" onClick={this.addImage}>Add image</button>
					</div>

                    <div className="form-group row">
                        <label htmlFor="vertices"><b>Authors</b></label>
                    </div>

					<div>
                        <AsyncSelect
                            isMulti
                            cacheOptions
                            defaultOptions
                            loadOptions={this.getOptions}
							onChange={this.handleAuthorsChange}
                        />
					</div>

					<br/>
					<div className="form-group row">
						<label for="vertices"><b>Vertices</b></label>
					</div>
					<div className="form-group row">
						<div className="form group col-md-6">
							<label for="coordenada1"><b>Coordinate 1</b></label>
							<input className="form-control" type="number" placeholder="Insert coordinate 1..." name="coordenada1" id="coordenada2" value={this.state.auxCoordenada1} data-index="0" onChange={this.handleVerticeCoordenada1Change} required />
						</div>
						<div class="form-group col-md-6">
							<label for="coordenada2"><b>Coordinate 2</b></label>
							<input className="form-control" type="number" placeholder="Insert coordinate 2..." name="coordenada2" id="coordenada2" value={this.state.auxCoordenada2} data-index="0" onChange={this.handleVerticeCoordenada2Change} required />
						</div>
						</div>
						<div className="form-group row ">
							<label for="order"><b>Order</b></label>
							<input className="form-control" type="number" placeholder="Insert order..." min="1" name="order" id="order" value={this.state.auxOrder} data-index="0" onChange={this.handleOrderChange} required />
							<button className="btn btn-primary" type="submit" value="submit" onClick={this.addVertice}>Add vertice</button>
						</div>
						
						<br/>
						<div className="tabelaVertices">
							<table className="table table-hover table-dark table-striped rounded" id="vertices">
								<thead>
                       				 <tr style={{
                        			textAlign:"center"
                     				 }}>
                           				 <th scope="col" >Coordinate 1</th>
                           				 <th scope="col" >Coordinate 2</th>
                           				 <th scope="col" >Order</th>

                       				 </tr>
                    			</thead>
                    			<tbody>
                        			{listaVertices}
                    			</tbody>
                			</table>
						</div>

					<div className="form-group row">
						<label for="Routes"><b>Routes</b></label>
					</div>
					<div className="form-group row">
						<select class="custom-select" onChange={this.handleRouteChange}>
							{options}
						</select>
						<button className="btn btn-primary" type="submit" value="submit" onClick={this.addRoute}>Add route</button>
					</div>

					<div className="form-group col"></div>
					<hr class="mb-3"></hr>
					<button className="btn btn-lg btn-dark btn-block" type="submit" value="submit" onClick={this.handleSubmit} name="create">
						Submit
                </button>
					<ErrorAlert errors={this.state.errors} />
				</form>
			</div>
		);
	}
						
						
	//get forms

	handleSubmit(e) {
		e.preventDefault();
		const file = this.fileUpload.files[0];
		console.log(file);
		console.log(this.state.vertices);
		console.log(this.state.authors);
		pontosDeInteresseApi.create(this.state.buildingName,this.state.location, this.state.dates,this.state.buildingType,
																this.state.description,this.state.coordinate1,this.state.coordinate2, 
																this.state.vertices,
																this.state.images,this.state.authors,this.state.routes
			).then((response)=>{

				if(response.ok){
					this.props.history.push('/PointsOfInterest');
				}

			}).catch( (error) => {
				console.log("error ");
				console.log(error);
            	this.setState({errors:error});
			});
		

	}

	deleteRoute(index) {
		let aux1 = this.state.routes;
		aux1.splice(index,1);
		this.setState({routes:aux1});
	}

	deleteVertices (index){
		let aux1 = this.state.vertices;
		aux1.splice(index,1);
		this.setState({vertices:aux1});

		/*let aux1 = this.state.vertices;
		aux1.splice(index, 1);
		this.setState({images:aux1});*/

	}

    getOptions(input){
        return authorsApi.list(1,input).then((response) => {

        	let data=response.data;
        	let res = data.map(author => ({ value: author.id, label: author.name }));

        	console.log(res);

        	return res;

		});
    }

	addVertice (e){
		e.preventDefault();
		let object = {coordinate1: '', coordinate2:'', order:''};
		object.coordinate1 = this.state.auxCoordenada1;
		object.coordinate2 = this.state.auxCoordenada2;
		object.order = this.state.auxOrder;
		console.log(object);
		//console.log(this.state.vertices);
		this.setState({vertices: this.state.vertices.concat(object)});
		this.setState({auxCoordenada1:''});
		this.setState({auxCoordenada2:''});
		this.setState({auxOrder:''});
		
	}

	addRoute(e) {
		e.preventDefault();
		if(this.state.selectedRoute!==null){
			this.setState({routes: [...this.state.routes,this.state.selectedRoute]});
		}
	}

		/*
				this.setState( {images: [...this.state.images,obj]} );

		handleRoutesChange (e, index) {
			console.log("routes");
			const routes = this.state.routes;
			routes[index].name_routes = e.target.value;
			this.state({
					routes
			});
	};*/

	handleRouteChange(e){
		this.setState({selectedRoute: e.target.value});
	}

	handleAuthorsChange (selectedOptions){

		let authors=[];

		for(let k in selectedOptions){
			authors.push(selectedOptions[k].value);
		}

		this.setState({authors:authors});
	}

	handleBuildingNameChange(e) {
		this.setState({ buildingName: e.target.value });
	}

	handleLocationChange(e) {
		this.setState({ location: e.target.value });
	}

	handleDatesChange(e) {
		this.setState({ dates: e.target.value });
	}

	handleBuildingTypeChange(e) {
		this.setState({ buildingType: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleCoordinate1Change(e) {
		this.setState({ coordinate1: e.target.value });
	}

	handleCoordinate2Change(e) {
		this.setState({ coordinate2: e.target.value });
	}

	handleVerticeCoordenada1Change(e) {
		this.setState({ auxCoordenada1: e.target.value });
	}

	handleVerticeCoordenada2Change(e) {
		this.setState({ auxCoordenada2: e.target.value });
	}

	handleOrderChange (e){
		e.preventDefault();
		this.setState({auxOrder: e.target.value});
	}

	handleImagesChange(e) {
		e.preventDefault();
		this.setState( {auxImg: e.target.value} );
	}

	handleImgDescChange(e){
		this.setState({ auxDesc: e.target.value });
	}

	handleImgAuthorChange(e){
		this.setState({ auxAuthor: e.target.value });
	}

	/*  	handleRoutesChange(e) {
		this.setState( { nameRoute: e.target.value });
	} */

	addImage(e){
		e.preventDefault();
		const file = this.fileUpload.files[0];
		let obj = {image:'',sourceAuthor:'',description:''};
		//ir buscar a imagem.
		obj.image = file;
		//ir buscar o autor da imagem
		obj.sourceAuthor = this.state.auxAuthor;
		//ir buscar a descrição da imagem
		obj.description= this.state.auxAuthor;
		//verificar se não há nada com string vazia
		//fazer push de obj para o images[] do state
		this.setState( {images: [...this.state.images,obj]} );
		//esvaziar o valor dos inputs
		this.setState({auxImg:''}); //falta mudar no input qualquer coisa também
		this.setState({auxAuthor:''});
		this.setState({auxDesc:''});
	}
	
	deleteImage(index){
		//é possível fazer tudo na mesma linha mas assim parece-me ser mais facil de entenderem
		//se alguém estiver a estudar esta funcionalidade
		let aux = this.state.images;
		aux.splice(index,1);
		this.setState({images:aux});
	}


	/*handleAuthorsChange (e, index){
			console.log("authors");
			const authors = this.state.authors;
			authors[index].name_author = e.target.value;
			this.setState({
					authors
			});
	};*/


	getRoutes(page){
		roteirosApi.list(page).then((response) => {

			let arrayFinal={};

			for(let k in response.data){
				console.log("teste");
				if(response.data.hasOwnProperty(k)){
					arrayFinal[response.data[k].id]=response.data[k];
				}
			}
			
      this.setState({ routesList: arrayFinal,
											routesPage:response.current_page,
                      routesPageMax:response.last_page });
    });
	}

}

/* ReactDOM.render (<fileInput />, document.getElementById('root')); */

export default CriarPontosInteresse;