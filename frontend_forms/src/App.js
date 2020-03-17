import React, { Component } from 'react';
// import { renderRoutes } from 'react-router-config';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  render() {
    return (
      <Router>
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">IPT RAM</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Roteiros</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Edifícios</a>
      </li>
      <li class="nav-item">
        <Link to="/login" class="nav-link">Login</Link>
      </li>
      <li class="nav-item">
        <Link to="/" class="nav-link">Registar</Link>
      </li>
    </ul>
  </div>
</nav>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/" component={Register}></Route>
      </Router>
    );
  }
}

export default App;
