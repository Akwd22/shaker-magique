import React from "react";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <h2>Vos cocktails</h2>
      <CocktailList />
    </div>
  );
}

export default HomePage;
