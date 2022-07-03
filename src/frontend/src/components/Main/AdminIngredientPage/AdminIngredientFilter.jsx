import React from "react";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import "./AdminIngredientFilter.css";

/**
 * Composant AdminIngredientFilter
 * @param {*} props 
 */
function AdminIngredientFilter(props) {
  return (
    <div className="admin-ingredients-filter">
      <ReactTableSearchBar
        onSearch={props.onSearch}
        placeholder="Nom de l'ingredient"
      />
      <button className="admin-ingredients-filter-create" onClick={ () => window.location.href="/admin/ingredients/creer"}>
        Créer un ingrédient
      </button>
    </div>
  );
}

export default AdminIngredientFilter;
