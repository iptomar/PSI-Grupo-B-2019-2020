import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CriarPontosInteresse from "./Pages/PontosDeInteresse/CriarPontosInteresse";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register2 from "./Pages/Register2";
import Login2 from "./Pages/Login2";
import Mapa from './Pages/Mapa';

class App extends Component {

  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">IPT RAM</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Roteiros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Edifícios</a>
              </li>
              <li className="nav-item">
                <Link to="/login2" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register2" className="nav-link">Registar</Link>
              </li>
              <li className="nav-item">
                <Link to="/CreatePointsOfInterest" className="nav-link">Criar Pontos de Interesse</Link>
              </li>
              <li className="nav-item">
                  <Link to="/Mapa" className="nav-link">Mapa</Link>
                </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/login2" component={Login2}></Route>
        <Route exact path="/register2" component={Register2}></Route>
        <Route exact path="/CreatePointsOfInterest" component={CriarPontosInteresse}></Route>
        <Route exact path="/Mapa" component={Mapa}></Route>
      </Router>
   
       
      
    );
  }
}

export default App;
