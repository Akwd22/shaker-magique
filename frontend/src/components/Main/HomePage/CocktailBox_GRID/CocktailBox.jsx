import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";
import { Link } from "react-router-dom";
import ScoreBar from "../../../ScoreBar/ScoreBar";

class CocktailBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cocktail_data: this.props.cocktail,
    };
  }

  render_ingredients() {
    //console.dir(this.state.cocktail_data)
    let children = [];

    for (const ingredient of this.state.cocktail_data.ingredients) {
      children.push(<p>{ingredient.intitule}</p>);
    }
    return children;
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
            style={{
              backgroundImage: `url(${this.state.cocktail_data.illustrationurl})`,
            }}
          >
            <div className="cocktailbox-score">
              <ScoreBar className="testtest" cocktail={this.state.cocktail_data} readOnly={true} />
            </div>
          </div>
          <div className="cocktailbox-body">
            <h1>{this.state.cocktail_data.intitule}</h1>
            <h2>Description</h2>
            {this.render_ingredients()}
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
