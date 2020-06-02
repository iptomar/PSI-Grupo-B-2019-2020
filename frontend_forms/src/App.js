import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CriarPontosInteresse from "./Pages/PontosDeInteresse/CriarPontosInteresse";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login2 from "./Pages/Login2";
import Home from "./Pages/Home";
//Users
import UserCreate from "./Pages/Users/Create";
import UserList from "./Pages/Users/List";
import UserEdit from "./Pages/Users/Edit";
import pontosDeInteresseApi from './scripts/api/pontosDeInteresse';
//pontos de interesse
import pontosDeInteresseList from "./Pages/PontosDeInteresse/PontosDeInteresseList";
import EditPontosInteresse from "./Pages/PontosDeInteresse/EditPontosInteresse";
import DetalhesPontoInteresse from "./Pages/PontosDeInteresse/PontosDeInteresseDetalhes";


//Routs
import RoutesList from './Pages/Routes/RoutesList';
import CreateRoutes from './Pages/Routes/CreateRoutes';
import EditRoutes from "./Pages/Routes/EditRoutes";
import DetalhesRoutes from "./Pages/Routes/DetalhesRoutes";
// import Mapa from './Pages/Mapa';

//Authors
import AuthorsList from './Pages/Authors/AuthorsList';
import CreateAuthors from './Pages/Authors/CreateAuthors';
import AuthorsEdit from './Pages/Authors/AuthorsEdit';
import DetalhesAuthors from './Pages/Authors/DetalhesAuthors';

class App extends Component {
 


  render() {
    
    console.log(window.location.pathname);

    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: "#4C5D72"}}>
          <a className="navbar-brand" href="/index">IPT RAM</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/Authors" className="nav-link" style={{color:"#5ED0C0"}} href="#">Autores</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreateAuthors" style={{color:"#5ED0C0"}} className="nav-link">Criar Autores</Link>
              </li>
              <li className="nav-item">
                <Link to="/Routes" className="nav-link" style={{color:"#5ED0C0"}} href="#">Roteiros</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreateRoutes" style={{color:"#5ED0C0"}} className="nav-link">Criar Roteiros</Link>
              </li>
              <li className="nav-item">
                <Link to="/PointsOfInterest" style={{color:"#5ED0C0"}} className="nav-link">Pontos De Interesse</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreatePointsOfInterest" style={{color:"#5ED0C0"}} className="nav-link">Criar Pontos de Interesse</Link>
              </li>
              <li className="nav-item">
                <Link to="/login2" style={{color:"#5ED0C0"}} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/users/create" style={{color:"#5ED0C0"}} className="nav-link">Registo</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/users" style={{color:"#5ED0C0"}} className="nav-link">Users</Link>
              </li>
             {/*  <li className="nav-item">
                  <Link to="/Mapa" style={{color:"#5ED0C0"}} className="nav-link">Mapa</Link>
                </li> */} 
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Login2}></Route>
        <Route exact path="/Authors" component={AuthorsList}></Route>
        <Route exact path="/CreateAuthors" component={CreateAuthors}></Route>
        <Route exact path="/Authors/:AuthorsId/edit" component={AuthorsEdit}></Route>
        <Route exact path="/Authors/:AuthorsId/detalhes" component={DetalhesAuthors}></Route>
        <Route exact path="/login2" component={Login2}></Route>
        <Route exact path="/users/create" component={UserCreate}></Route>
        <Route exact path="/users" component={UserList}></Route>
        <Route exact path="/users/:userId/edit" component={UserEdit}></Route>
        <Route exact path="/CreatePointsOfInterest" component={CriarPontosInteresse}></Route>
        <Route exact path="/PointsOfInterest" component={pontosDeInteresseList}></Route>
        <Route exact path="/PointsOfInterest/:pontoInteresseID/edit" component={EditPontosInteresse}></Route>
        <Route exact path="/PointsOfInterest/:pontoInteresseID/detalhes" component={DetalhesPontoInteresse}></Route>
        <Route exact path="/Routes" component={RoutesList}></Route>
        <Route exact path="/CreateRoutes" component={CreateRoutes}></Route>
        <Route exact path="/Routes/:RoutesId/edit" component={EditRoutes}></Route>
        <Route exact path="/Routes/:RoutesId/detalhes" component={DetalhesRoutes}></Route>
      </Router>
    );
    
  }
  
}

export default App;
