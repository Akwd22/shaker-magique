import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  apiCreateIngredient,
  apiGetIngredient,
  apiUpdateIngredient,
  usePermission,
} from "../../../Axios";
import AdminEditIngredientInfo from "./AdminEditIngredientInfo";
import "./AdminEditIngredientPage.css";

/**
 * Composant AdminEditIngredientPage
 * @param {*} props 
 */
function AdminEditIngredientPage(props) {
  const isAdmin = usePermission("admin");
  const history = useHistory();
  const [ingredient, setIngredient] = useState({});

  //Si l'user n'est pas admin il est redirigé sur la page d'accueil
  if (!isAdmin) {
    window.location.replace("/");
  }

  // Hook d'effet
  /**
   * Dès que le composant est monté on fait une requete au serveur backend 
   * pour récupérer tout les ingredients de la base de donné
   */
  useEffect(() => {
    async function selfFunction() {
      if (props.mode === "edit") {
        const ingredient = await apiGetIngredient(props.match.params.id); // requete
        setIngredient(ingredient);
      }
    }
    selfFunction();
  }, []);

  //Dès que les informations de l'ingredients change on les change
  const handleChange = (ingredient) => {
    setIngredient(ingredient);
  };

  /**
   * Fonction appelé lors de la validation du formulaire
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let ok;

    // Gère les requetes à envoyer
    if (props.mode === "create") {
      ok = await apiCreateIngredient(ingredient);
    } else {
      ok = await apiUpdateIngredient(ingredient);
    }

    //Si tout est bon on se redige sur la page qui affiche tous les ingredients
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
