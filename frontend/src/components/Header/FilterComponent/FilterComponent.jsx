import React, { useState, useEffect } from "react";
import "./FilterComponent.css";
import axiosInstance from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

function FilterComponent(props) {
  let history = useHistory();

  //Hook d'état symbolisant l'écriture dans la barre de recherche
  const [data, setData] = useState({
    //De base rien n'est écrit dans la barre de recherche (état initial)
    search: "",
  });

  //Hook d'état symbolisant la réponse du serveur i.e les cocktails correspondant 
  //aux critères de recherche.
  const [queryResult, setQueryResult] = useState({
    cocktails: "",
  })

  //Fonction appelé lorsque l'on clique sur le bouton de recherche ou appuie sur entré
  const goSearch = (e) => {
    console.log("mot recherché : "+ data.search);
    e.preventDefault();
    //history.push({
    //  pathname: "/filtre/",
    //})

    props.filterFunction({search: data.search, cat:"A"})
  };

  /*Quand j'appuie sur le bouton :
    • Faire une requete à l'url http://localhost:8000/api/cocktails/filtre/
    en fonction des filtres coché ou non.
    • Renvoyé la réponse du serveur
    • Afficher les composants correspondant à la requete 
  */

  //Fonction appelé lorsque l'on écrit dans la barre de recherche
  const handleChange = (e) =>{
    e.preventDefault();
    setData({ search: e.target.value})
  }

  return (
    <div className="filter-component">
      <div className="filter-component-container">
        <form className="filter-component-fom" onSubmit={(e) => goSearch(e)}>
          <div className="container-search-box" >
            <button className="search-box-button" type="submit">
              <i class="fas fa-search" ></i>
            </button>
            <input
              type="text"
              value = {data.search}
              placeholder="Un ingrédient, un titre de cocktail..."
              className="search-box-input"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="container-checkbox">
            <div className="checkbox-col1">
              <div className="checkbox-col1-cat">
                <input type="checkbox" id="checkBox-apero"></input>
                <label htmlFor="checkBox-apero">Apéritif</label>
              </div>
              <div className="checkbox-col1-cat">
                <input type="checkbox" id="checkBox-digestifs"></input>
                <label htmlFor="checkBox-digestifs">Digestifs</label>
              </div>
              <div className="checkbox-col1-cat">
                <input type="checkbox" id="checkBox-alcool"></input>
                <label htmlFor="checkBox-alcool">Sans alcool</label>
              </div>
            </div>
            <div className="checkbox-col2">
              <div className="checkbox-col2-select">
                <select name="sort" id="select-sort">
                  <option value="" disabled selected>
                    Trier par...
                  </option>
                  <option value="avis" className="sort-options">
                    Avis
                  </option>
                  <option value="Force" className="sort-options">
                    Force
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterComponent;
