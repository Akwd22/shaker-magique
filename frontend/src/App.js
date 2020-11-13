import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/main/HomePage/HomePage";
import CocktailPage from "./components/main/CocktailPage/CocktailPage";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cocktail" exact component={CocktailPage} />
          <Route path="/" component={() => <div>ERREUR 404</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;