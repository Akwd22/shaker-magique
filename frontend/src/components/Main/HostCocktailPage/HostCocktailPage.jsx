import React, { useEffect, useState } from "react";
import HostCocktailsFilter from "./HostCocktailsFilter";
import HostCocktailPageTable from "./HostCocktailPageTable";
import {
  apiGetCocktails,
  apiGetCocktailsProposer,
  usePermission,
} from "../../Axios/Axios";
import "./HostCocktailPage.css";
import { useHistory } from "react-router-dom";

function HostCocktailPage() {
  const [cocktails, setCocktails] = useState([]);
  const [search, setSearch] = useState();
  const isUser = usePermission("user");

  if (!isUser) window.location.replace("/");

  const handleSearch = (search) => {
    setSearch(search);
  };

  useEffect(async () => {
    //On recupère tous les cocktails de la db
    const cocktails = await apiGetCocktails();

    //On recupère tous les cocktails proposer par l'user.
    const cocktailsProposer = await apiGetCocktailsProposer();

    // Pour chaque cocktails
    cocktails.forEach((i) => {
      // cocher, celui qui est posposer par l'utilisateur
      cocktailsProposer.forEach((j) => {
        if (i.id === j.idcocktail) {
          i.proposer = true;
        }
      });
    });

    setCocktails(cocktails);
  }, []);

  return (
    <div className="page host-cocktails-page">
      <div className="host-cocktails-page-container">
        <HostCocktailsFilter onSearch={handleSearch} />
        <HostCocktailPageTable cocktails={cocktails} search={search} />
      </div>
    </div>
  );
}

export default HostCocktailPage;
