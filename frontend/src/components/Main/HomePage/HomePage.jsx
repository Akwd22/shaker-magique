import React from "react";
import { Component } from "react";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";

export default class HomePage extends Component {

  constructor(props) {
    super(props)

    console.log("données récupérés de la filtercomponent : " + props.filter)
  }

  render() {
    return (
      <div className="homepage page">
        <CocktailList/>
      </div>
    );
  }
}
