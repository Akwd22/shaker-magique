import React from "react";
import "./CocktailBox.css";

function CocktailBox() {
  return (
    <div className="cocktailbox">
      <h2 className="cocktailbox-tittle">Titre cocktail</h2>
      <div className="cocktailbox-container">
        <img
          className="cocktailbox-container-img"
          src="img/placeholder.jpg"
          alt=""
        ></img>
        <div className="cocktailbox-container-desc">
          <h2>Description</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. orem Ipsum is simply dummy text of the printing and
            typesetting industry
          </p>
        </div>
      </div>
      <div className="cocktailbox-button">
        <button>Voir la recette</button>
      </div>
    </div>
  );
}

export default CocktailBox;
