import React, { useEffect } from "react";
import { apiGetCocktails } from "../../../Axios";
import AdminCocktailTable from "./AdminCocktailTable";
import AdminCocktailsFilter from "./AdminCocktailsFilter";
import { usePermission } from "../../../Axios";
import "./AdminCocktailsPage.css";
import { useHistory } from "react-router-dom";

function AdminCocktailsPage() {
  const isAdmin = usePermission("admin");
  const history = useHistory();

  if (!isAdmin) history.replace("/");

  const [cocktails, setCocktails] = React.useState([]);
  const [search, setSearch] = React.useState();

  useEffect(() => {
    async function selfFunction() {
      setCocktails(await apiGetCocktails());
    }
    selfFunction();
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
