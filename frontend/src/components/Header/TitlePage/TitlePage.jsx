import React from "react";
import "./TitlePage.css";
import { useLocation } from "react-router-dom";

/**
 * Composant TitlePage
 */
function TitlePage() {
  //avoir l'url
  const location = useLocation();

  /**
   * Fonction qui gère le titre des pages affiché dans la navbar en fonction des pages
   */
  const titlePageModifier = function () {
    let res = "";
    switch (location.pathname) {
      case "/connexion":
        res = <h1>connexion</h1>;
        break;
      case "/cocktail":
        res = <h1>vos cocktails</h1>;
        break;
      case "/inscription":
        res = <h1>inscription</h1>;
        break;
      case "/rejoindre-hote":
        res = <h1>rejoindre un hôte</h1>;
        break;
      case "/profil":
        res = <h1>Profil</h1>;
        break;
      case "/hote/cocktails":
        res = <h1>Cocktails que vous proposez</h1>;
        break;
      case "/hote/ingredients":
        res = <h1>Votre stock d'ingredients</h1>;
        break;
      case "/admin":
        res = <h1>Panneau d'administration</h1>;
        break;
      case "/admin/cocktails":
        res = <h1>Liste de tous les cocktails</h1>;
        break;
      case "/admin/ingredients":
        res = <h1>Liste de tous les ingredients</h1>;
        break;
      case "/admin/cocktails/creer":
        res = <h1>Créer un cocktail</h1>;
        break;
      case "/admin/ingredients/creer":
        res = <h1>Créer un ingrédient</h1>;
        break;
      case "/mentions-legales":
        res = <h1>Mention légales</h1>;
        break;
      case "/confidentialite":
        res = <h1>Confidentialité</h1>;
        break;
      default:
        break;
    }
    return res;
  };

  return (
    <div className="title-page-header">
      <div className="title-page-header-container">{titlePageModifier()}</div>
    </div>
  );
}

export default TitlePage;
