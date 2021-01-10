import React from "react";
import HostIngredientsTable from "./HostIngredientsTable";
import ReactTableSearchBar from "../../Table/ReactTableSearchBar";
import { apiGetCurrentStock, apiGetIngredients } from "../../Axios/Axios";
import { usePermission } from "../../Axios/Axios";
import "./HostIngredientsPage.css";
import { useHistory } from "react-router-dom";

function HostIngredientsPage(props) {
  const isUser = usePermission("user");

  if (!isUser) window.location.replace("/");

  const [ingredients, setIngredients] = React.useState([]);
  const [search, setSearch] = React.useState();

  React.useEffect(async () => {
    // Récupérer tous les ingrédients
    const ingredients = await apiGetIngredients();

    // Récupérer les ingrédients stockés par l'utilisateur
    const selected = await apiGetCurrentStock();

    // Pour chaque ingrédient...
    ingredients.forEach((i) => {
      // ... cocher, celui en stock par l'utilisateur
      selected.forEach((j) => {
        if (i.id === j.idingredient && j.enreserve) {
          i.enreserve = true;
        }
      });
    });

    setIngredients(ingredients);
  }, []);

  const handleSearch = (search) => {
    setSearch(search);
  };

  return (
    <div className="page host-ingredients-page">
      {true && (
        <div className="host-ingredients-page-container">
          <div className="host-ingredients-search">
            <ReactTableSearchBar
              onSearch={handleSearch}
              placeholder="Un ingrédient..."
            />
          </div>
          <HostIngredientsTable ingredients={ingredients} search={search} />
        </div>
      )}
    </div>
  );
}

export default HostIngredientsPage;
