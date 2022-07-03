import React from "react";
import FilterComponent from "./FilterComponent/FilterComponent";
import Navbar from "./Navbar/Navbar";
import "./Header.css";
import { useLocation } from "react-router-dom";
import WaveComponentHome from "./waveComponent/WaveComponentHome";
import WaveComponentOther from "./waveComponent/WaveComponentOther";
import TitlePage from "./TitlePage/TitlePage";

/**
 * Composant Header
 * @param {*} props 
 */
function Header(props) {
  //avoir l'url
  const location = useLocation();

  /**
   * Fonction d'affichage conditionnel.
   * Affichage le composant "FilterComponent" si l'url est égale à la page d'accueil
   * Sinon affiche le titre de la page
   */
  const headFilter = function () {
    if (location.pathname === "/") {
      return <FilterComponent filterFunction={props.filterFunction} filterData={props.filterData}/>;
    } else {
      return <TitlePage />;
    }
  };

  /**
   * Fonction d'affichage conditionnel
   * Affichage le composant "WaveComponentHome" si on est sur la page d'accueil
   * Sinon affichage le composant "WaveComponentOther.
   * Composant correspondant à la vague en arrière plan du Header
   */
  const headWave = function () {
    if (location.pathname === "/") {
      return <WaveComponentHome />;
    } else {
      return <WaveComponentOther />;
    }
  };

  return (
    <div className="header">
      <header>
        <div className="wave-container">{headWave()}</div>
        <div className="header-component">
          <Navbar/>
          {headFilter()}
        </div>
      </header>
    </div>
  );
}

export default Header;
