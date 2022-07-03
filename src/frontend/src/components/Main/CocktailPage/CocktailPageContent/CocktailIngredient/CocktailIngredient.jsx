import React from "react";
import "./CocktailIngredient.css";

class CocktailIngredient extends React.Component {

  /**
   * Formater la quantité et l'unité en un affichage convenable
   */
  format_quantite() {
    const quantite = this.props.ingredient.quantite;
    const unite = this.props.ingredient.unite;

    return (
      " (" + (quantite ? quantite + " " : "") + (unite ? unite : "") + ")"
    );
  }

  render() {
    return (
      <div className="cocktail-ingredient">
        <div className="cocktail-ingredient-icon">
          <i className="fas fa-arrow-right"></i>
        </div>
        <div className="cocktail-ingredient-text">
          <p>
            {this.props.ingredient.intitule}
            <span className="cocktail-ingredient-quantite">
              {this.format_quantite()}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default CocktailIngredient;
