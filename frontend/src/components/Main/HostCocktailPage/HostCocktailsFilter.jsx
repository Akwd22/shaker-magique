import React from "react";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./HostCocktailsFilter.css"

/**
 * Composant HostCocktailsFilter
 * @param {*} props 
 */
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
