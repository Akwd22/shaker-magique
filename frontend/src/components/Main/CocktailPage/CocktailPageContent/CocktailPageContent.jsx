import React from "react";
import CocktailTag from "../../../CocktailTag/CocktailTag";
import CocktailIngredient from "./CocktailIngredient/CocktailIngredient";
import ScoreBar from "../../../ScoreBar/ScoreBar";
import { Markup } from "interweave";

class CocktailPageContent extends React.Component {
  /**
   * Afficher les étiquettes du cocktail
   */
  render_tags() {
    const children = [];
    const cat = this.props.cocktail.categorie;
    const alc = this.props.cocktail.forcealc;

    if (cat === "A") children.push(<CocktailTag text="Apéritif" />);
    if (cat === "D") children.push(<CocktailTag text="Digestif" />);
    if (cat === "AD") {
      children.push(<CocktailTag text="Apéritif" />, <CocktailTag text="Digestif" />);
    }

    if (!alc || alc === 0) {
      children.push(<CocktailTag text="Sans alcool" />);
    } else {
      children.push(<CocktailTag text={"Force " + alc} />);
    }

    return children;
  }

  /**
   * Afficher les ingrédients
   */
  render_ingredients() {
    const children = [];

    for (const ingredient of this.props.cocktail.ingredients) {
      children.push(<CocktailIngredient ingredient={ingredient} />);
    }

    return children;
  }

  /**
   * Formater la description pour afficher notamment les sauts de ligne
   */
  format_description() {
    if (!this.props.cocktail.description) {
      return "";
    }

    return this.props.cocktail.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  render() {
    return (
      <div className="cocktailPage-container">
        <div
          className="cocktailPage-left-container"
          alt="image du cocktail selectioné"
          style={{
            backgroundImage: `url(${this.props.cocktail.illustrationurl})`,
          }}
        >
          <div className="cocktailPage-left-container-score">
            <ScoreBar cocktail={this.props.cocktail} readOnly={false} size="medium" />
          </div>
        </div>
        <div className="cocktailPage-right-container">
          <div className="cocktailPage-right-container-header">
            <div className="cocktailPage-right-container-header-row1">
              <h2>{this.props.cocktail.intitule}</h2>
            </div>
            <div className="cocktailPage-right-container-header-cat">{this.render_tags()}</div>
          </div>
          <div className="cocktailPage-right-container-blockInfo">
            <div className="cocktailPage-right-container-ingredients">
              <div className="cocktailPage-ingredient-container">
                <h2 className="cocktailPage-ingredient-container-title">ingrédients</h2>
                <div className="cocktailPage-ingredient-container-list">
                  {this.render_ingredients()}
                </div>
              </div>
            </div>
            <div className="cocktailPage-right-container-desc">
              <h2 className="cocktailPage-desc-container-title">description</h2>
              <div className="cocktailPage-desc-container-text">
                <Markup content={this.format_description()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CocktailPageContent;
