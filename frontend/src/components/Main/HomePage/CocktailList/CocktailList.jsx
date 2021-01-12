import React from "react";
import CocktailBox from "../CocktailBox_GRID/CocktailBox";
import "./CocktailList.css";
import "../../../variables.css";
import { Component } from "react";
export default class CocktailList extends Component {


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
