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
import ProfilPage from "./components/Main/ProfilPage/ProfilPage";
import AdminCocktailsPage from "./components/Main/AdminCocktailsPage/AdminCocktailsPage";
import AdminEditCocktailPage from "./components/Main/AdminEditCocktailPage/AdminEditCocktailPage";
import HostIngredientsPage from "./components/Main/HostIngredientsPage/HostIngredientsPage";
import HostCocktailPage from "./components/Main/HostCocktailPage/HostCocktailPage";
import AdminIngredientPage from "./components/Main/AdminIngredientPage/AdminIngredientPage";
import AdminEditIngredientPage from "./components/Main/AdminEditIngredientPage/AdminEditIngredientPage";
import AdminPage from "./components/Main/AdminPage/AdminPage";
import MentionsLegalesPage from "./components/Main/MentionsLegalesPage/MentionsLegalesPage";
import ConfidentialitePage from "./components/Main/ConfidentialitePage/ConfidentialitePage";

export default class App extends Component {
  /**
   * Constructeur
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { cocktails: "", filterdata: undefined };
    this.searchFilter = this.searchFilter.bind(this);
  }
  /**
   *
   * @param {*} data
   */
  searchFilter(data) {
    let url;
    let state = this.state;
    let hasHote = get_hote();
    let id_hote;
    let iManquant = 0;

    //Hote
    if (hasHote) {
      id_hote = hasHote.id;
    }

    /**
     * Rechargé les filtres si on ne provient pas de la barre de recherche
     */
    if (!data) {
      data = this.state.filterdata;
    }

    if (data) {
      //Save les filtres dans l'état
      // eslint-disable-next-line react/no-direct-mutation-state
      state.filterdata = data;
      let searchResult = data.search;
      let hasCat = data.cat;
      let categorie;
      let trieForceAlcool = data.trie.trie;

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

      url =
        "/cocktails/filtre/?" +
        (hasHote ? "hote=" + id_hote + "&manquants=" + iManquant : "") +
        (searchResult ? "&search=" + searchResult : "") +
        (categorie ? "&cat=" + categorie : "") +
        (trieForceAlcool ? "&tri=" + trieForceAlcool : "");
    } else {
      url =
        "/cocktails/filtre/?" +
        (hasHote ? "hote=" + id_hote + "&manquants=" + iManquant : "");
    }
    //console.dir(state.filterdata);

    axiosInstance
      .get(url)
      .then((response) => {
        state.cocktails = response.data;
        this.setState(state);
        //console.log(response.data);
      })
      .catch((err) => console.log(err));
    //console.dir(data);
  }

  /**
   * Rendu des composants
   */
  render() {
    return (
      <div className="app">
        <Router>
          <Header
            filterFunction={this.searchFilter}
            filterData={this.state.filterdata}
          />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <HomePage cocktails={this.state.cocktails} />}
            />
            <Route path="/cocktail/:id" component={CocktailPage} />
            <Route path="/inscription" component={RegisterPage} />
            <Route path="/connexion" component={LoginPage} />
            <Route path="/deconnexion" component={LogoutPage} />
            <Route path="/rejoindre-hote" component={JoinHostPage} />
            <Route path="/profil" component={ProfilPage} />
            <Route
              path="/hote/cocktails"
              exact
              component={HostCocktailPage}
            ></Route>
            <Route path="/hote/ingredients" component={HostIngredientsPage} />
            <Route path="/admin" exact component={AdminPage} />
            <Route
              path="/admin/cocktails"
              exact
              component={AdminCocktailsPage}
            />
            <Route
              path="/admin/cocktails/modifier/:id"
              exact
              component={(props) => (
                <AdminEditCocktailPage mode="edit" {...props} />
              )}
            />
            <Route
              path="/admin/cocktails/creer"
              exact
              component={() => <AdminEditCocktailPage mode="create" />}
            />
            <Route
              path="/admin/ingredients"
              exact
              component={AdminIngredientPage}
            />
            <Route
              path="/admin/ingredients/creer"
              exact
              component={() => <AdminEditIngredientPage mode="create" />}
            />
            <Route
              path="/admin/ingredients/modifier/:id"
              exact
              component={(props) => (
                <AdminEditIngredientPage mode="edit" {...props} />
              )}
            />
            <Route path="/mentions-legales" component={MentionsLegalesPage} />
            <Route path="/confidentialite" component={ConfidentialitePage} />
            <Route path="/" component={() => <div>ERREUR 404</div>} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
