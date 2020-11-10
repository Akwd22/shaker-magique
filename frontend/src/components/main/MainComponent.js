import React from "react";
import FilterComponent from "./FilterComponent/FilterComponent";
import "./MainComponent.css";
import CocktailBox from "./CocktailBox/CocktailBox";
import CocktailList from "./CocktailList/CocktailList";

function mainComponent() {
  return (
    <div className="MainComponent">
      <CocktailList>
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
      </CocktailList>
      <FilterComponent />
    </div>
  );
}

export default mainComponent;