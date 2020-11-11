import React from "react";
import CocktailBox from "../CocktailBox/CocktailBox";
import CocktailList from "../CocktailList/CocktailList";
import FilterComponent from "../FilterComponent/FilterComponent";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="HomePage">
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

export default HomePage;
