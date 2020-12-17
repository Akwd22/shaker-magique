import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Main/HomePage/HomePage";
import CocktailPage from "./components/Main/CocktailPage/CocktailPage";
import "./App.css";
import RegisterPage from "./components/Main/RegisterPage/RegisterPage";
import LoginPage from "./components/Main/LoginPage/LoginPage";
import JoinHostPage from "./components/Main/JoinHostPage/JoinHostPage";
import LogoutPage from "./components/Main/LogoutPage/LogoutPage";
import { Component } from "react";
import axiosInstance from "./components/Axios/Axios";

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {cocktails: ""}
    this.searchFilter = this.searchFilter.bind(this)
  }

  searchFilter(data) {
    this.setState({
      cocktails: data
    })



    console.log("filtre/?search="+ data.search +"&cat="+data.cat+"&tri=forcealc&hote=3&manquants=0")


  }

  render() {
    return (
      <div className="app">
        <Router>
          <Header filterFunction={this.searchFilter} />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <HomePage filter={this.state.cocktails} />}
            />
            <Route path="/cocktail" component={CocktailPage} />
            <Route path="/inscription" component={RegisterPage} />
            <Route path="/connexion" component={LoginPage} />
            <Route path="/deconnexion" component={LogoutPage} />
            <Route path="/rejoindre-hote" component={JoinHostPage} />
            <Route path="/" component={() => <div>ERREUR 404</div>} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
