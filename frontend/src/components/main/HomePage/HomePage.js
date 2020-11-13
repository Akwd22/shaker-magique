import React from "react";
import CocktailBox from "./CocktailBox_GRID/CocktailBox";
import CocktailList from "./CocktailList/CocktailList";
import FilterComponent from "./FilterComponent/FilterComponent";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="page homepage">
      <CocktailList>
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
        <CocktailBox />
      </CocktailList>
    </div>
  );
}

export default HomePage;
