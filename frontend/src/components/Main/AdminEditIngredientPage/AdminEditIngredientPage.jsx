import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiGetIngredient, usePermission } from "../../Axios/Axios";
import AdminEditIngredientInfo from "./AdminEditIngredientInfo";
import "./AdminEditIngredientPage.css";

function AdminEditIngredientPage(props) {
  const isAdmin = usePermission("admin");
  const history = useHistory();
  const [ingredient, setIngredient] = useState({});

  if (!isAdmin) history.replace("/");

  useEffect(async () => {
    if (props.mode === "edit") {
      const ingredient = await apiGetIngredient(props.match.params.id);
      setIngredient(ingredient);
    }
  }, []);

  const handleChange = (ingredient) => {
    setIngredient(ingredient);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.mode === "create") {
      //apiCreateIngredient(ingredients);
    } else {
      //apiUpdateIngredient(ingredients);
    }
  };

  return (
    <div className="page admin-edit-ingredient-page">
      <div className="admin-edit-ingredient-container">
        <form className="admin-edit-ingredient-form" onSubmit={handleSubmit}>
          <AdminEditIngredientInfo
            ingredient={ingredient}
            onChange={handleChange}
          />
        </form>
        <button className="admin-edit-ingredient-button">
          {props.mode === "create" ? "Créer" : "Modifier"} l'ingredient
        </button>
      </div>
    </div>
  );
}

export default AdminEditIngredientPage;
