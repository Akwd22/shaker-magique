import React from "react";
import "./CocktailTag.css";

class CocktailTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cocktail-tag">
        <p className="cocktail-tag-text">{this.props.text}</p>
      </div>
    );
  }
}

export default CocktailTag;
