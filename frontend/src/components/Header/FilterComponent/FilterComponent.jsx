import React, { useState } from "react";
import "./FilterComponent.css";
import { get_hote } from "../../Axios/Axios";

function FilterComponent(props) {
  //Hook d'état symbolisant l'écriture dans la barre de recherche
  const [dataSearchBar, setDataSearchBar] = useState({
    //De base rien n'est écrit dans la barre de recherche (état initial)
    search: "",
  });

  //Hook d'état symbolisant les catégories choisies
  const [dataCat, setDataCat] = useState({
    //De base la checkbox n'est pas coché
    catCheckedA: false,
    catCheckedD: false,
    catCheckedSA: false,
  });

  const [dataTriForce, setDataTriForce] = useState({
    trie: "",
  });

  //Fonction appelé lorsque l'on clique sur le bouton de recherche ou appuie sur entré
  const goSearch = (e) => {
    //console.log("mot recherché : " + dataSearchBar.search);
    e.preventDefault();
    props.filterFunction({
      search: dataSearchBar.search,
      cat: dataCat,
      hote: get_hote(),
      trie: dataTriForce.trie,
    });
    //console.dir(dataCat);
  };

  //Fonction appelé lorsque l'on écrit dans la barre de recherche
  const handleChangeSearchBar = (e) => {
    e.preventDefault();
    setDataSearchBar({ search: e.target.value });
  };

  //Fonction appelé lorsque l'on change une valeur dans la selectBox
  const handleChangeSelectBox = (e) => {
    if(e.target.value === "Force"){
      console.log("Option de trie par force")
      setDataTriForce({ trie: "forcealc" });
    }
    else if(e.target.value === "avis"){
      console.log("Option de trie par avis")
    }
  }

  //Fonction appelé lorsque l'on choisit une catégorie dans la liste des checkboxs
  // AD = Apéritif et digestif
  // A = apéritif
  // D = Digestif
  // SA = Sans alcool
  const handleChangeCheckbox = (e) => {
    let state = dataCat;
    if (e.target.id === "checkBox-digestifs") {
      state.catCheckedD = e.target.checked;

      //console.dir(e.target.checked);
      //console.log("cb digestif");
    }
    if (e.target.id === "checkBox-apero") {
      state.catCheckedA = e.target.checked;

      //console.dir(e.target.checked);
      //console.log("cb apéritif");
    }
    if (e.target.id === "checkBox-sans-alcool") {
      state.catCheckedSA = e.target.checked;
      //console.dir(e.target.checked);
      //console.log("cb sans alcool");
    }
    setDataCat(state);
  };

  return (
    <div className="filter-component">
      <div className="filter-component-container">
        <form className="filter-component-fom" onSubmit={(e) => goSearch(e)}>
          <div className="container-search-box">
            <button className="search-box-button" type="submit">
              <i class="fas fa-search"></i>
            </button>
            <input
              type="text"
              value={dataSearchBar.search}
              placeholder="Un ingrédient, un titre de cocktail..."
              className="search-box-input"
              onChange={(e) => handleChangeSearchBar(e)}
            />
          </div>

          <div className="container-checkbox">
            <div className="checkbox-col1">
              <div className="checkbox-col1-cat">
                <input
                  type="checkbox"
                  id="checkBox-apero"
                  checked={dataCat.catChecked}
                  onChange={handleChangeCheckbox}
                ></input>
                <label htmlFor="checkBox-apero">Apéritif</label>
              </div>
              <div className="checkbox-col1-cat">
                <input
                  type="checkbox"
                  id="checkBox-digestifs"
                  checked={dataCat.catChecked}
                  onChange={handleChangeCheckbox}
                ></input>
                <label htmlFor="checkBox-digestifs">Digestifs</label>
              </div>
              <div className="checkbox-col1-cat">
                <input
                  type="checkbox"
                  id="checkBox-sans-alcool"
                  checked={dataCat.catChecked}
                  onChange={handleChangeCheckbox}
                ></input>
                <label htmlFor="checkBox-sans-alcool">Sans alcool</label>
              </div>
            </div>
            <div className="checkbox-col2">
              <div className="checkbox-col2-select">
                <select name="sort" id="select-sort" onChange={(e) => handleChangeSelectBox(e)}>
                  <option value="" disabled selected>
                    Trier par...
                  </option>
                  <option value="avis" className="sort-options">
                    Avis
                  </option>
                  <option
                    value="Force"
                    className="sort-options "
                  >
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
