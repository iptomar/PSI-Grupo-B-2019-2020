import React, { Component } from 'react';
import './CriarPontosInteresse.css';
import ErrorAlert from '../../views/Global/ErrorAlert';
import pontosDeInteresseApi from '../../scripts/api/pontosDeInteresse';

class CriarPontosInteresse extends Component {

	constructor(props) {
		super(props);
		this.state = {
			buildingName: '', location: '', dates: '', buildingType: '', description: '', coordinate1: '', coordinate2: '',
			auxImg:'', auxAuthor:'', auxDesc:'', auxCoordenada1: '', auxCoordenada2: '', auxOrder: '',
			vertices: [], images: [], 
			authors: [
				{
					name: "Bernardo"
				},
				{
					name: "Bernas"
				}

			], routes: [2],
			errors: []
		};

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
		// this.handleRoutesChange = this.handleRoutesChange.bind(this);
		this.handleVerticeCoordenada1Change = this.handleVerticeCoordenada1Change.bind(this);
		this.handleVerticeCoordenada2Change = this.handleVerticeCoordenada2Change.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();

		this.handleOrderChange = this.handleOrderChange.bind(this);
		this.addImage = this.addImage.bind(this);
		this.handleImgDescChange = this.handleImgDescChange.bind(this);
		this.handleImgAuthorChange = this.handleImgAuthorChange.bind(this);
		this.addVertice = this.addVertice.bind(this);
	}


	render() {
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
						<input className="form-control" type="number" id="dates" name="dates"  placeholder="The year." value={this.state.dates} onChange={this.handleDatesChange} required></input>
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
					<div>
						<label for="image"><b>Upload file</b></label>
						<input type="file" label='Upload' ref={(ref)=>this.fileUpload = ref} value={this.state.image} onChange={this.handleImagesChange} />
					</div>

					<div className="form-group row">
						<label for="source_author"><b>Source Author</b></label>
						<input className="form-control" id="source_author" name="source_author" rows="3" placeholder="Add a source author about the point of interest." value={this.state.auxAuthor} onChange={this.handleImgAuthorChange} required></input>
					</div>
					<div className="form-group row">
						<label for="description_images"><b>Description</b></label>
						<input className="form-control" id="description_images" name="description_images" rows="3" placeholder="Add a description about the point of interest." value={this.state.auxDesc} onChange={this.handleImgDescChange} required></input>
						<button className="btn btn-primary" onClick={this.addImage}>adicionar imagem</button>
					</div>
						

					<div className="form-group row">
						<label for="author"><b>Authors</b></label>
					</div>

					<div className="form-group row">
						<label for="name_author"><b>Name</b></label>
						<input className="form-control" id="name_author" name="name_author" rows="3" placeholder="Add a name about the point of interest." value={this.state.name_author} onChange={this.handleAuthorsChange} required></input>
					</div>

					<div className="form-group row">
						<label for="vertices"><b>Vertices</b></label>
					</div>

					<div className="form-group row">
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
						<div className="form group col-md-6">
							<label for="order"><b>Order</b></label>
							<input className="form-control" type="number" placeholder="Insert order..." min="1" name="order" id="order" value={this.state.auxOrder} data-index="0" onChange={this.handleOrderChange} required />
						</div>
						<div>
							<button type="submit" value="submit" onClick={this.addVertice}>Add vertice</button>
						</div>
					</div>
					<div className="form-group row">
						<label for="routes"><b>Routes</b></label>
					</div>
					<div className="form-group row">
						<label for="name_routes"><b>Name Route</b></label>
						<input className="form-control" id="name_routes" name="name_routes" rows="3" placeholder="Add a name about the point of interest." value={this.state.name_routes} onChange={this.handleRoutesChange} required></input>
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

	//get forms

	handleSubmit(e) {
		e.preventDefault();
		const file = this.fileUpload.files[0];
		pontosDeInteresseApi.create(this.state.buildingName,this.state.location, this.state.dates,this.state.buildingType,
																this.state.description,this.state.coordinate1,this.state.coordinate2,
																this.state.vertices,this.state.images,this.state.authors,this.state.routes
			).then((response)=>{
				console.log(response);
			});
		

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

	addVertice (e){
		e.preventDefault();
		let object = {coordinate1: '', coordinate2:'', order:''};
		object.coordinate1 = this.state.auxCoordenada1;
		object.coordinate2 = this.state.auxCoordenada2;
		object.order = this.state.auxOrder;
		this.setState({vertices: [...this.state.vertices, object]});
		this.setState({auxCoordenada1:''});
		this.setState({auxCoordenada2:''});
		this.setState({auxOrder:''});
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


	/*handleAuthorsChange (e, index){
			console.log("authors");
			const authors = this.state.authors;
			authors[index].name_author = e.target.value;
			this.setState({
					authors
			});
	};*/

	/*handleRoutesChange (e, index) {
			console.log("routes");
			const routes = this.state.routes;
			routes[index].name_routes = e.target.value;
			this.state({
					routes
			});
	};*/
}

/* ReactDOM.render (<fileInput />, document.getElementById('root')); */

export default CriarPontosInteresse;