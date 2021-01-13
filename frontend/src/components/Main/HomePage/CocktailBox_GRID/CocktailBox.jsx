import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";
import { Link } from "react-router-dom";
import ScoreBar from "../../../ScoreBar/ScoreBar";
import CocktailTag from "../../../CocktailTag/CocktailTag";

/**
 * Composant CocktailBox
 */
class CocktailBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktail_data: this.props.cocktail,
    };
  }

  /**
   * Fonction qui affiche les ingredients nécéssaire pour le cocktail
   */
  render_ingredients() {
    let children = [];

    for (const ingredient of this.state.cocktail_data.ingredients) {
      children.push(<p>{ingredient.intitule}</p>);
    }

    return children;
  }

  /**
   * Fonction qui affiche les catégorie du cocktail
   */
  render_tag() {
    let text;

    if (this.state.cocktail_data) {
      text =
        this.state.cocktail_data.forcealc > 0
          ? `Force ${this.state.cocktail_data.forcealc}`
          : "Sans alcool";
    }

    return <CocktailTag text={text} />;
  }

  render() {
    return (
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={"/cocktail/" + this.state.cocktail_data.id}
      >
        <div className="cocktailbox">
          <div
            className="cocktailbox-img"
            alt = "Imagine represent votre cocktail"
            style={{
              backgroundImage: `url(${this.state.cocktail_data.illustrationurl})`,
            }}
          >
            <div className="cocktailbox-score">
              <ScoreBar
                cocktail={this.state.cocktail_data}
                readOnly={true}
                size="small"
              />
            </div>
          </div>
          <div className="cocktailbox-body">
            <div className="cocktailbox-body-content">
              <h1>{this.state.cocktail_data.intitule}</h1>
              <h2>Description</h2>
              {this.render_ingredients()}
            </div>
            <div className="cocktailbox-body-tags">{this.render_tag()}</div>
          </div>
          <div className="cocktailbox-overlay">
            <div className="cocktail-overlay-body">
              <i className="fas fa-book-open"></i>
              <p>Voir la recette</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default CocktailBox;
