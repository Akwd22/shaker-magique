import React from "react";
import CocktailBox from "../CocktailBox_GRID/CocktailBox";
import "./CocktailList.css";
import "../../../variables.css";
import axiosInstance, { getUser } from "../../../Axios/Axios";
import { Component } from "react";

export default class CocktailList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCocktails();
  }

  async getCocktails() {
    await axiosInstance
      .get("/cocktails")
      .then((response) => this.setState({ cocktails: response.data }))
      .catch((error) => console.log(error));
  }

  renderCocktails() {
    // Les cocktails n'ont pas encore été chargés
    if (!this.state.cocktails) return;

    // Créer toutes les CocktailBox
    let t = [];
    for (let i = 0; i < this.state.cocktails.length; i++) {
      t[i] = <CocktailBox cocktail={this.state.cocktails[i]} />;
    }

    return t;
  }

  render() {
    return (
      <div className="cocktaillist">
        <div className="title-page">
          <h2>Vos Cocktails</h2>
        </div>
        <div className="list-cocktail">{this.renderCocktails()}</div>
      </div>
    );
  }
}
