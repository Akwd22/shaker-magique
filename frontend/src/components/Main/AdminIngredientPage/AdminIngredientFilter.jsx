import React from "react";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./AdminIngredientFilter.css";

function AdminIngredientFilter(props) {
  return (
    <div className="admin-ingredients-filter">
      <ReactTableSearchBar
        onSearch={props.onSearch}
        placeholder="Nom de l'ingredient"
      />
      <button className="admin-ingredients-filter-create">
        Créer un ingrédient
      </button>
    </div>
  );
}

export default AdminIngredientFilter;
