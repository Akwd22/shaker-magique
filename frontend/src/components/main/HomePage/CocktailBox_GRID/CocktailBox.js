import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";
import { Link } from "react-router-dom";

class CocktailBox extends React.Component {
  render() {
    return (
      <div className="cocktailbox">
        <h1 className="cocktailbox-title">Titre cocktail</h1>
        <img className="cocktailbox-img" src="img/placeholder.jpg" alt="" />
        <div className="cocktailbox-desc">
          <h2>Description</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            aliquid laudantium ratione natus temporibus quae dolor delectus esse
            expedita deleniti. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Vitae aliquid laudantium ratione natus temporibus
            quae dolor delectus esse expedita deleniti. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Vitae aliquid laudantium ratione
            natus temporibus quae dolor delectus esse expedita deleniti.
          </p>
        </div>

        <Link to="/cocktail" className="cocktailbox-button">
          <button>Voir la recette</button>
        </Link>
      </div>
    );
  }
}

export default CocktailBox;
