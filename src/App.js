import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Login from "./login/login";
import firebase from "./firebase/firebase.utils";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard" component={Layout} />
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
