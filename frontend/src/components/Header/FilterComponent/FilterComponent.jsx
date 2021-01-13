import React, { useEffect, useState } from "react";
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
  });

  const [SaCat, setSaCat] = useState({
    catCheckedSA: false,
  });

  const [dataTriForce, setDataTriForce] = useState({
    trie: "",
    value: "",
  });

  useEffect(() => {
    setDataSearchBar({
      search: props.filterData ? props.filterData.search : "",
    });
    setDataCat({
      catCheckedA: props.filterData ? props.filterData.cat.catCheckedA : false,
      catCheckedD: props.filterData ? props.filterData.cat.catCheckedD : false,
    });
    setSaCat({
      catCheckedSA: props.filterData
        ? props.filterData.cat.catCheckedSA
        : false,
    });

    setDataTriForce({
      trie: props.filterData ? props.filterData.trie.trie : "",
      value: props.filterData ? props.filterData.trie.value : "",
    });

    props.filterFunction(undefined);
  }, []);

  //Fonction appelé lorsque l'on clique sur le bouton de recherche ou appuie sur entré
  const goSearch = (e) => {
    //console.log("mot recherché : " + dataSearchBar.search);
    e.preventDefault();
    props.filterFunction({
      search: dataSearchBar.search,
      cat: dataCat,
      catSa: SaCat,
      hote: get_hote(),
      trie: dataTriForce,
    });
  };

  //Fonction appelé lorsque l'on écrit dans la barre de recherche
  const handleChangeSearchBar = (e) => {
    e.preventDefault();
    setDataSearchBar({ search: e.target.value });
  };

  //Fonction appelé lorsque l'on change une valeur dans la selectBox
  const handleChangeSelectBox = (e) => {
    let state = dataTriForce;
    if (e.target.value === "Force") {
      state.trie = "forcealc";
      state.value = "Force";
    } else if (e.target.value === "moyenne") {
      state.trie = "moyenne";
      state.value = "moyenne";
    } else if (e.target.value === "manquant") {
      state.trie = "manquant";
      state.value = "manquant";
    } else if (e.target.value === "default") {
      state.trie = "";
      state.value = "";
    }

    setDataTriForce({ ...state });
  };

  //Fonction appelé lorsque l'on choisit une catégorie dans la liste des checkboxs
  // AD = Apéritif et digestif
  // A = apéritif
  // D = Digestif
  // SA = Sans alcool
  const handleChangeCheckbox = (e) => {
    let state = dataCat;
    if (e.target.id === "checkBox-digestifs") {
      state.catCheckedD = e.target.checked;
    }
    if (e.target.id === "checkBox-apero") {
      state.catCheckedA = e.target.checked;
    }
    setDataCat({ ...state });
  };

  const handleChangeCheckboxSansAlcool = (e) => {
    let state = SaCat;
    if (e.target.id === "checkBox-sans-alcool") {
      state.catCheckedSA = e.target.checked;
    }
    setSaCat({...state});
  }

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
                  checked={dataCat.catCheckedA}
                  onChange={handleChangeCheckbox}
                ></input>
                <label htmlFor="checkBox-apero">Apéritif</label>
              </div>
              <div className="checkbox-col1-cat">
                <input
                  type="checkbox"
                  id="checkBox-digestifs"
                  checked={dataCat.catCheckedD}
                  onChange={handleChangeCheckbox}
                ></input>
                <label htmlFor="checkBox-digestifs">Digestifs</label>
              </div>
              <div className="checkbox-col1-cat">
                <input
                  type="checkbox"
                  id="checkBox-sans-alcool"
                  checked={SaCat.catCheckedSA}
                  onChange={handleChangeCheckboxSansAlcool}
                ></input>
                <label htmlFor="checkBox-sans-alcool">Sans alcool</label>
              </div>
            </div>
            <div className="checkbox-col2">
              <div className="checkbox-col2-select">
                <select
                  name="sort"
                  id="select-sort"
                  value={dataTriForce.value}
                  onChange={(e) => handleChangeSelectBox(e)}
                >
                  <option value="default">Trier par...</option>
                  <option value="moyenne" className="sort-options">
                    Note
                  </option>
                  <option value="Force" className="sort-options ">
                    Force
                  </option>
                  <option value="manquant" className="sort-options ">
                    1 ingr. manquant
                  </option>
                </select>
              </div>
              {/*<button type="submit">Recherché</button>*/}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterComponent;
