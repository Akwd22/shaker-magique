import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";

function CocktailBox() {
  return (
    <div className="cocktailbox">
      <h2 className="cocktailbox-container-title">Un cocktail</h2>
      <div className="cocktailbox-container">
        <div className="cocktail-box-container-row">
          <div className="container-col-img">
            <img className="" src="img/placeholder.jpg" alt=""></img>
          </div>
          <div className="container-col-desc">
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              ut deserunt fugit. Possimus magnam incidunt nihil beatae
              exercitationem esse corrupti, reiciendis atque suscipit, ratione
              dolorum voluptate error ad quia commodi.
            </p>
          </div>
        </div>
        <button className="cocktailbox-button">Voir la recette</button>
      </div>
    </div>
  );
}

export default CocktailBox;
