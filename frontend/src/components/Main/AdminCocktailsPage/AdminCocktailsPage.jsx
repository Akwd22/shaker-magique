import React from "react";
import { apiGetCocktails } from "../../Axios/Axios";
import AdminCocktailTable from "./AdminCocktailTable";
import AdminCocktailsFilter from "./AdminCocktailsFilter";
import { get_user, is_logged, usePermission } from "../../Axios/Axios";
import "./AdminCocktailsPage.css";

function AdminCocktailsPage() {
  const isAdmin = usePermission("admin");

  if (!isAdmin) window.location.replace("/");

  const [cocktails, setCocktails] = React.useState([]);
  const [search, setSearch] = React.useState();

  React.useEffect(async () => {
    setCocktails(await apiGetCocktails());
  }, []);

  const handleSearch = (search) => {
    setSearch(search);
  };

  return (
    <div className="page admin-cocktails-page">
      {isAdmin && (
        <div className="admin-cocktails-page-container">
          <AdminCocktailsFilter onSearch={handleSearch} />
          <AdminCocktailTable cocktails={cocktails} search={search} />
        </div>
      )}
    </div>
  );
}

export default AdminCocktailsPage;
