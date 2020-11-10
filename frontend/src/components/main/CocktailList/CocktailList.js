import React from "react";
import "./CocktailList.css";
import "../../variables.css";

class CocktailList extends React.Component {
  render() {
    return (
      <div className="cocktaillist">
        {this.props.children}
      </div>
    );
  }
}

export default CocktailList;
