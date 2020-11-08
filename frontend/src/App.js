import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CocktailBox from "./components/CocktailBox/CocktailBox";
import CocktailFilterBox from "./components/CocktailFilterBox/CocktailFilterBox";
import CocktailFilterBar from "./components/CocktailFilterBox/CocktailFilterBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <CocktailFilterBar />
      <CocktailFilterBox/>
    </div>
  );
}

export default App;
