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
import axiosInstance, { get_hote } from "./components/Axios/Axios";

export default class App extends Component {
  /**
   * Constructeur
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { cocktails: "" };
    this.searchFilter = this.searchFilter.bind(this);
  }

  /**
   *
   * @param {*} data
   */
  searchFilter(data) {
    let hasHote = get_hote();
    let id_hote;
    let searchResult = data.search;
    let hasCat = data.cat;
    let categorie;
    let trieForceAlcool = data.trie;
    let iManquant = 0;

    //Hote
    if (hasHote) {
      id_hote = hasHote.id;
    }

    //Catégorie
    if (hasCat.catCheckedA) {
      categorie = "A";
    }
    if (hasCat.catCheckedD) {
      categorie = "D";
    }
    if (hasCat.catCheckedSA) {
      categorie = "SA";
    }
    if (hasCat.catCheckedA && hasCat.catCheckedD) {
      categorie = "AD";
    }

    //Trie par degré d'alcool

    let url =
      "/cocktails/filtre/?" +
      (hasHote ? "hote=" + id_hote + "&manquants=" + iManquant : "") +
      (searchResult ? "&search=" + searchResult : "") +
      (categorie ? "&cat=" + categorie : "") +
      (trieForceAlcool ? "&tri=" + trieForceAlcool : "");

    axiosInstance
      .get(url)
      .then((response) => {
        this.setState({ cocktails: response.data });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    //console.log("filtre/?search="+ data.search +"&cat="+data.cat+"&tri=forcealc&hote=3&manquants=0")
    console.dir(data);
  }

  /**
   * Rendu des composants
   */
  render() {
    return (
      <div className="app">
        <Router>
          <Header filterFunction={this.searchFilter} />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <HomePage cocktails={this.state.cocktails} />}
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
