import React from "react";
import "./FilterComponent.css";
import "../../variables.css";

function FilterComponent() {
  return (
    <div className="FilterComponent">
      <div className="FilterComponent-total">
        <div className="filter-button-component">
          <button className="filter-button" onClick="">
            Filtres
          </button>
        </div>
        <div className="CocktailFilterBox">
          <div className="filterBar">
            <div className="filterBar-cat">
              <h2>Catégories</h2>
            </div>
            <div className="filterBar-cat-elements">
              <div className="filterBar-cat-elements-col1">
                <div className="filterBar-cat-apero">
                  <input type="checkbox" id="checkBox-apero"></input>
                  <label for="checkBox-apero">Apéritif</label>
                </div>
                <div className="filterBar-cat-digestifs">
                  <input type="checkbox" id="checkBox-digestifs"></input>
                  <label for="checkBox-digestifs">Digestifs</label>
                </div>
              </div>
              <div className="filterBar-cat-elements-col2">
                <div className="filterBar-cat-alcool">
                  <input type="checkbox" id="checkBox-alcool"></input>
                  <label for="checkBox-alcool">Sans alcool</label>
                </div>
              </div>
            </div>

            <div className="filterBar-filterBy">
              <h2>Trier par</h2>
            </div>

            <div className="filterBar-filterBy-elements">
              <div className="filterBar-filterBy-elements-col1">
                <div className="filterBar-filterBy-avis">
                  <input type="checkbox" id="checkBox-avis"></input>
                  <label for="checkBox-avis">Avis</label>
                </div>

                <div>
                  <input type="checkbox" id="checkBox-force"></input>
                  <label for="checkBox-force">Force</label>
                </div>
              </div>
            </div>
            <div className="filterBar-bottomPart">
              <button className="filterBar-bottomPart-button">Appliquer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
