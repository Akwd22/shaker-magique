import React, { useEffect, useState } from "react";
import "./AdminIngredientPage.css";
import AdminIngredientFilter from "./AdminIngredientFilter";
import AdminIngredientTable from "./AdminIngredientTable";
import { apiGetIngredients, apiUpdateIngredient, usePermission } from "../../Axios/Axios";

export default function AdminIngredientPage() {
  const isAdmin = usePermission("admin");
  if (!isAdmin) window.location.replace("/");

  const [ingredients, setIngredients] = useState([]);
  const [search, setSearch] = useState();

  useEffect(async () => {
    setIngredients(await apiGetIngredients());
  }, []);

  const handleSearch = (search) => {
    setSearch(search);
  };
  return (
    <div className="page admin-ingredients-page">
      {isAdmin && (
        <div className="admin-ingredients-page-container">
          <AdminIngredientFilter onSearch={handleSearch}/>
          <AdminIngredientTable ingredients={ingredients} search={search}/>
        </div>
      )}
    </div>
  );
}
