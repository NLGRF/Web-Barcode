import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from './App';
import Status from "./status";

class Tabs extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/status">Status</NavLink></li>
            </ul>
            <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/status" component={Status}/>
          </div>
          </div>
        </HashRouter>
      );
    }
  }

  export default Tabs;