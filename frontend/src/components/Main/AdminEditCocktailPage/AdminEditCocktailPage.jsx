import React from "react";
import { apiCreateCocktail, apiGetIngredients } from "../../Axios/Axios";
import { get_user, is_logged, usePermission } from "../../Axios/Axios";
import AdminEditCocktailInfo from "./AdminEditCocktailInfo";
import AdminEditCocktailTable from "./AdminEditCocktailTable";
import "./AdminEditCocktailPage.css";

function AdminEditCocktailPage({ mode }) {
  //const isAdmin = usePermission("admin");

  const [ingredients, setIngredients] = React.useState([]);
  const [cocktail, setCocktail] = React.useState({});
  const [image, setImage] = React.useState();

  React.useEffect(async () => {
    setIngredients(await apiGetIngredients());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCreateCocktail(cocktail, image);
  };

  const handleChange = (cocktail, image) => {
    setCocktail(cocktail);
    setImage(image);
  };

  return (
    <div className="page admin-edit-cocktail-page">
      <div className="admin-edit-cocktail-container">
        <form className="admin-edit-cocktail-form" onSubmit={handleSubmit}>
          <AdminEditCocktailInfo onChange={handleChange} />
          <AdminEditCocktailTable ingredients={ingredients} />
          <button className="admin-edit-cocktail-create">
            {mode === "create" ? "Créer" : "Modifier"} le cocktail
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminEditCocktailPage;
