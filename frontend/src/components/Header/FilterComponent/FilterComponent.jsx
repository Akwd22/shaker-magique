import React from "react";
import "./FilterComponent.css";


function FilterComponent() {
  return (
    <div className="filter-component">
      <div className="filter-component-container">
        <div className="container-search-box">
          <a href="/#" className="search-box-button" id="srcBox">
            <i class="fas fa-search"></i>
          </a>
          <input
            type="text"
            name=""
            placeholder="Un ingrédient, un titre de cocktail..."
            className="search-box-input"
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
                <option value="avis" className = "sort-options">Avis</option>
                <option value="Force" className = "sort-options">Force</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
