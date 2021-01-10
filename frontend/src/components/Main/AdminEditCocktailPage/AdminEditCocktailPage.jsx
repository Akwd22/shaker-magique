import React from "react";
import {
  apiCreateCocktail,
  apiGetIngredients,
  apiGetCocktail,
  apiUpdateCocktail,
} from "../../Axios/Axios";
import { get_user, is_logged, usePermission } from "../../Axios/Axios";
import AdminEditCocktailInfo from "./AdminEditCocktailInfo";
import AdminEditCocktailTable from "./AdminEditCocktailTable";
import "./AdminEditCocktailPage.css";

function AdminEditCocktailPage(props) {
  const isAdmin = usePermission("admin");

  if (!isAdmin) {
    window.location.replace("/");
  }

  const [cocktail, setCocktail] = React.useState({});
  const [image, setImage] = React.useState();
  const [ingredients, setIngredients] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  React.useEffect(async () => {
    // On récupère tous les ingrédients
    const ingredients = await apiGetIngredients();

    // On récupère le cocktail si mode édition
    if (props.mode === "edit") {
      const cocktail = await apiGetCocktail(props.match.params.id);

      // On sélectionne les ingrédients contenus dans le cocktail
      const selected = cocktail.ingredients;

      // Pour chaque ingrédient...
      ingredients.forEach((i) => {
        // ... cocher, celui qui est contenu dans le cocktail
        selected.forEach((j) => {
          if (i.id == j.idingredient) {
            i.contenir = true;
            i.quantite = j.quantite;
            i.unite = j.unite;
          }
        });
      });

      setCocktail(cocktail);
      setSelectedIngredients(selected);
    }

    setIngredients(ingredients);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.mode === "create") {
      apiCreateCocktail(cocktail, image, selectedIngredients);
    } else {
      apiUpdateCocktail(cocktail, image, selectedIngredients);
    }
  };

  const handleChange = (cocktail, image) => {
    setCocktail(cocktail);
    setImage(image);
  };

  const handleIngredientChange = (ingredients) => {
    const selected = [];

    ingredients.forEach((elt) => {
      if (elt.contenir) {
        selected.push({
          idingredient: elt.id,
          quantite: elt.quantite ? Number(elt.quantite) : 0,
          unite: elt.unite,
        });
      }

      setSelectedIngredients(selected);
    });
  };

  return (
    <div className="page admin-edit-cocktail-page">
      <div className="admin-edit-cocktail-container">
        <form className="admin-edit-cocktail-form" onSubmit={handleSubmit}>
          <AdminEditCocktailInfo onChange={handleChange} cocktail={cocktail} />
          <AdminEditCocktailTable
            onChange={handleIngredientChange}
            ingredients={ingredients}
          />
          <button className="admin-edit-cocktail-create">
            {props.mode === "create" ? "Créer" : "Modifier"} le cocktail
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditCocktailPage;
