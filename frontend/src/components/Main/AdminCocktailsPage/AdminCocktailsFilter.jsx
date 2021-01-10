import React from "react";
import { useHistory } from "react-router-dom";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./AdminCocktailsFilter.css";

export default function AdminCocktailsFilter(props) {
  const history = useHistory();

  const handleCreate = (e) => {
    history.push("/admin/cocktails/creer");
  };

  return (
    <div className="admin-cocktails-filter">
      <ReactTableSearchBar
        onSearch={props.onSearch}
        placeholder="Titre du cocktail..."
      />
      <button onClick={handleCreate} className="admin-cocktails-filter-create">
        Créer un cocktail
      </button>
    </div>
  );
}
