import React from "react";
import "./PageContainer.css";
import HomePage from "./HomePage/HomePage";
import CocktailPage from "./CocktailPage/CocktailPage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function PageContainer() {
  return (
    <div className="pagecontainer">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cocktail" exact component={CocktailPage} />
          <Route path="/" component={() => <div>ERREUR 404</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default PageContainer;
