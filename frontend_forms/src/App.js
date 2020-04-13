import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CriarPontosInteresse from "./Pages/PontosDeInteresse/CriarPontosInteresse";
import Mapa from "./Pages/Mapa";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login2 from "./Pages/Login2";
import Home from "./Pages/Home";

//Users
import UserCreate from "./Pages/Users/Create";
import UserList from "./Pages/Users/List";
import UserEdit from "./Pages/Users/Edit";

// import Mapa from './Pages/Mapa';

class App extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: "#4C5D72"}}>
          <a className="navbar-brand" href="#">IPT RAM</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" style={{color:"#5ED0C0"}} href="#">Home <span className="sr-only"></span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{color:"#5ED0C0"}} href="#">Roteiros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" style={{color:"#5ED0C0"}} href="#">Edifícios</a>
              </li>
              <li className="nav-item">
                <Link to="/login2" style={{color:"#5ED0C0"}} className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/users/create" style={{color:"#5ED0C0"}} className="nav-link">Create</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreatePointsOfInterest" style={{color:"#5ED0C0"}} className="nav-link">Criar Pontos de Interesse</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" style={{color:"#5ED0C0"}} className="nav-link">Users</Link>
              </li>
              <li className="nav-item">
                <Link to="/Mapa" style={{color:"#5ED0C0"}} className="nav-link">Mapa</Link>
              </li>
             {/*  <li className="nav-item">
                  <Link to="/Mapa" style={{color:"#5ED0C0"}} className="nav-link">Mapa</Link>
                </li> */} 
            </ul>
          </div>
        </nav>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/login2" component={Login2}></Route>
        <Route exact path="/users/create" component={UserCreate}></Route>
        <Route exact path="/users" component={UserList}></Route>
        <Route exact path="/users/:userId/edit" component={UserEdit}></Route>
        <Route exact path="/CreatePointsOfInterest" component={CriarPontosInteresse}></Route>
        <Route exact path="/Mapa" component={Mapa}></Route> 
      </Router> 
    );
  }
}

export default App;
