import React from "react";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./HostCocktailsFilter.css"

export default function HostCocktailsFilter(props) {
  return (
    <div className="host-cocktails-filter">
      <ReactTableSearchBar
        onSearch={props.onSearch}
        placeholder="Nom de cocktail"
      />
    </div>
  );
}
