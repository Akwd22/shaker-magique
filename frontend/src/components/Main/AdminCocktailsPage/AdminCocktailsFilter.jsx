import React from "react";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./AdminCocktailsFilter.css";

export default function AdminCocktailsFilter(props) {
  return (
    <div className="admin-cocktails-filter">
      <ReactTableSearchBar
        onSearch={props.onSearch}
        placeholder="Titre du cocktail..."
      />
      <button className="admin-cocktails-filter-create">
        Créer un cocktail
      </button>
    </div>
  );
}
