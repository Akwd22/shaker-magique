import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";
import { Link } from "react-router-dom";

class CocktailBox extends React.Component {
  render() {
    return (
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to="/cocktail"
      >
        <div className="cocktailbox">
          <div className="cocktailbox-img"></div>
          <div className="cocktailbox-body">
            <h1>Titre Cocktail</h1>
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ut deserunt fugit. Possimus magnam incidunt nihil beatae
              exercitationem esse corrupti, reiciendis atque suscipit, ratione
              dolorum voluptate error ad quia commodi.
            </p>
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
