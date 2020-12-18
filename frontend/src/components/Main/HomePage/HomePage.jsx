import React from "react";
import { Component } from "react";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";

export default class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage page">
        <CocktailList cocktails={this.props.cocktails}/>
      </div>
    );
  }
}
