import React from "react";
import "./CocktailList.css";
import "../../../variables.css";

class CocktailList extends React.Component {
  render() {
    return (
      <div className="cocktaillist">
        <div className="title-page">
        <h1>vos cocktails</h1>
        </div>
        <div className="list-cocktail">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default CocktailList;
