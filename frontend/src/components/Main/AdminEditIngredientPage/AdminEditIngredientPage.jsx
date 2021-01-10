import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  apiCreateIngredient,
  apiGetIngredient,
  apiUpdateIngredient,
  usePermission,
} from "../../Axios/Axios";
import AdminEditIngredientInfo from "./AdminEditIngredientInfo";
import "./AdminEditIngredientPage.css";

function AdminEditIngredientPage(props) {
  const isAdmin = usePermission("admin");
  const history = useHistory();
  const [ingredient, setIngredient] = useState({});

  if (!isAdmin) {
    window.location.replace("/");
  }

  useEffect(async () => {
    if (props.mode === "edit") {
      const ingredient = await apiGetIngredient(props.match.params.id);
      setIngredient(ingredient);
    }
  }, []);

  const handleChange = (ingredient) => {
    setIngredient(ingredient);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ok;

    if (props.mode === "create") {
      ok = await apiCreateIngredient(ingredient);
    } else {
      ok = await apiUpdateIngredient(ingredient);
    }

    if (ok) {
      history.replace("/admin/ingredients");
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
          <button className="admin-edit-ingredient-button">
            {props.mode === "create" ? "Créer" : "Modifier"} l'ingredient
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditIngredientPage;
