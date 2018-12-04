import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import Usuarios from "./Usuarios";
import Home from "./Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Meu Aplicativo</p>
        </header>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/usuarios">Usuários</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/usuarios" component={Usuarios} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
