import React from "react";
import { Component } from "react";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage page">
        <CocktailList/>
      </div>
    );
  }
}
