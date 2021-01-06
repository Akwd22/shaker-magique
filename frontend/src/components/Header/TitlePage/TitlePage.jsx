import React from "react";
import "./TitlePage.css";
import { useLocation } from "react-router-dom";

function TitlePage() {
  const location = useLocation();

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
        res = <h1>Profil</h1>
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
