import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/Main/HomePage/HomePage";
import CocktailPage from "./components/Main/CocktailPage/CocktailPage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cocktail" component={CocktailPage} />
          <Route path="/" component={() => <div>ERREUR 404</div>} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
