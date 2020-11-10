import React from "react";
import "./App.css";
import Navbar from "./components/Header/Navbar/Navbar";
import MainComponent from "./components/main/MainComponent";
//import CocktailBox from "./components/main/CocktailBox/CocktailBox";

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainComponent/>
    </div>
  );
}

export default App;
