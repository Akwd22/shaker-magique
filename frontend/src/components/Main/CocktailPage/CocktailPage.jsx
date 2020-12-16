import React from "react";
import "../../variables.css";
import "./CocktailPage.css";
import { Link } from "react-router-dom";

class CocktailPage extends React.Component {
  render() {
    return (
      <div className="page cocktailpage">
        <div className="cocktailPage-container">
          <div className="cocktailPage-left-container">
            <p></p>
          </div>
          <div className="cocktailPage-rigth-container">
            <div className="cocktailPage-rigth-container-header">
              <div className="cocktailPage-rigth-container-header-row1">
                <h2>titre cocktail</h2>
                <p>
                  Par <span>Prénom</span> <span>Nom</span>
                </p>
              </div>
              <div className="cocktailPage-rigth-container-header-cat">
                <div className="header-cat-component">
                  <p className="header-cat-p">Apéritif</p>
                </div>
                <div className="header-cat-component">
                  <p className="header-cat-p">Digestif</p>
                </div>
                {/* TODO Variable qui map les catégories du cocktail*/}
              </div>
            </div>
            <div className="cocktailPage-rigth-container-blockInfo">
              <div className="cocktailPage-rigth-container-ingredients">
                <div className="cocktailPage-ingredient-container">
                  <h2 className="cocktailPage-ingredient-container-title">
                    ingrédients
                  </h2>
                  <div className="cocktailPage-ingredient-container-list">
                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            3/10
                          </span>
                          Martini dry
                        </p>
                      </div>
                    </div>

                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            3/10
                          </span>
                          Martini rouge
                        </p>
                      </div>
                    </div>

                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            3/10
                          </span>
                          Gin
                        </p>
                      </div>
                    </div>

                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            1/10
                          </span>
                          Crème de cassis
                        </p>
                      </div>
                    </div>

                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            1
                          </span>
                          trait de Jus de citron
                        </p>
                      </div>
                    </div>

                    <div className="ingredient-container-list-row">
                      <div className="list-row-icon">
                        <i class="fas fa-arrow-right"></i>
                      </div>
                      <div className="list-row-ingredient">
                        <p>
                          <span className="list-row-ingredient-quantité">
                            1
                          </span>
                          trait de Jus de Perier
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cocktailPage-rigth-container-desc">
                <h2 className="cocktailPage-desc-container-title">
                  description
                </h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate animi minima iste assumenda necessitatibus enim inventore eaque odit, sed repellendus porro laboriosam doloremque quia nihil labore accusamus minus adipisci rerum!Culpa fuga vitae, perferendis beatae odit hic! Eaque, quaerat consequatur esse odio id architecto facere possimus asperiores incidunt dolores placeat consequuntur suscipit minima vitae eligendi sapiente, ducimus culpa tenetur earum?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CocktailPage;
