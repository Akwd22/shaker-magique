import React from "react";
import CocktailTag from "./CocktailTag/CocktailTag";
import CocktailIngredient from "./CocktailIngredient/CocktailIngredient";
import { Markup } from "interweave";

class CocktailPageContent extends React.Component {
  constructor(props) {
    super(props);

    console.dir(props);
  }

  /**
   * Afficher les étiquettes qui correspondent à la catégorie du cocktail
   */
  render_tags() {
    const cat = this.props.cocktail.categorie;

    if (cat == "A") return <CocktailTag text="Apéritif" />;
    if (cat == "D") return <CocktailTag text="Digestif" />;
    if (cat == "AD") {
      return [<CocktailTag text="Apéritif" />, <CocktailTag text="Digestif" />];
    }
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
    return this.props.cocktail.description.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  render() {
    return (
      <div className="cocktailPage-container">
        <div
          className="cocktailPage-left-container"
          style={{
            backgroundImage: `url(${this.props.cocktail.illustrationurl})`,
          }}
        >
          {/*
          <div className="row-stats">
            <i class="fas fa-star"></i>
            </div>
          */}
        </div>
        <div className="cocktailPage-right-container">
          <div className="cocktailPage-right-container-header">
            <div className="cocktailPage-right-container-header-row1">
              <h2>{this.props.cocktail.intitule}</h2>
              {/*<p>
                Par <span>Prénom</span> <span>Nom</span>
              </p>*/}
            </div>
            <div className="cocktailPage-right-container-header-cat">
              {this.render_tags()}
            </div>
          </div>
          <div className="cocktailPage-right-container-blockInfo">
            <div className="cocktailPage-right-container-ingredients">
              <div className="cocktailPage-ingredient-container">
                <h2 className="cocktailPage-ingredient-container-title">
                  ingrédients
                </h2>
                <div className="cocktailPage-ingredient-container-list">
                  {this.render_ingredients()}
                </div>
              </div>
            </div>
            <div className="cocktailPage-right-container-desc">
              <h2 className="cocktailPage-desc-container-title">description</h2>
              <Markup content={this.format_description()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CocktailPageContent;