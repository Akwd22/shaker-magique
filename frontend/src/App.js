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
import CocktailList from "./components/Main/HomePage/CocktailList/CocktailList";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
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
