import React from "react";
import CocktailBox from "../CocktailBox_GRID/CocktailBox";
import "./CocktailList.css";
import "../../../variables.css";
import axiosInstance from "../../../Axios/Axios";
import { Component } from "react";
import Pagination from "../../Pagination/Pagination";
export default class CocktailList extends Component {
  constructor(props) {
    super(props);
  }

  renderCocktails() {
    // Les cocktails n'ont pas encore été chargés
    if (!this.props.cocktails) return;

    // Créer toutes les CocktailBox
    let t = [];
    for (let i = 0; i < this.props.cocktails.length; i++) {
      t[i] = <CocktailBox cocktail={this.props.cocktails[i]} />;
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
