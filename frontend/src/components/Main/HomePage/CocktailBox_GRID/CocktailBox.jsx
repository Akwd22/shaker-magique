import React from "react";
import "./CocktailBox.css";
import "../../../variables.css";
import { Link } from "react-router-dom";

class CocktailBox extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      cocktail_data: this.props.cocktail
    }
  }

  render() {
    return (
      <Link
        style={{ color: "inherit", textDecoration: "inherit" }}
        to={"/cocktail/" + this.state.cocktail_data.id}
      >
        <div className="cocktailbox">
          <div className="cocktailbox-img">
            
            {/*<img src={this.state.cocktail_data.illustrationurl}></img> */}
            
          </div>
          <div className="cocktailbox-body">
            <h1>{this.state.cocktail_data.intitule}</h1>
            <h2>Description</h2>
            <p>
              {this.state.cocktail_data.description}
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
