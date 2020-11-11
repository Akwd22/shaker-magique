import React from "react";
import "../../variables.css";
import "./CocktailPage.css";
import {Link} from "react-router-dom";

class CocktailPage extends React.Component {

  render() {
    return (
      <div className="cocktailpage">
        CECI EST UNE PAGE D'UN COCKTAIL...
        <Link to="/">
          <button>Retour</button>
        </Link>
      </div>
    );
  }
}

export default CocktailPage;
