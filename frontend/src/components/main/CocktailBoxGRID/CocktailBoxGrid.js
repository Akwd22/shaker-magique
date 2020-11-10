import React from "react";
import "./CocktailBoxGrid.css";
import "../../variables.css";

class CocktailBoxGrid extends React.Component {
  render() {
    return (
      <div className="cocktailbox">
        <h1 className="cocktailbox-title">Titre cocktail</h1>
        <img
          className="cocktailbox-img"
          src="placeholder.jpg"
          alt=""
        />
        <div className="cocktailbox-desc">
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            aliquid laudantium ratione natus temporibus quae dolor delectus
            esse expedita deleniti.
          </p>
        </div>
        <button className="cocktailbox-button">Voir la recette</button>
      </div>
    );
  }
}

export default CocktailBoxGrid;
