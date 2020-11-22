import React from "react";
import FilterComponent from "./FilterComponent/FilterComponent";
import Navbar from "./Navbar/Navbar";
import "./Header.css";
import { useLocation } from "react-router-dom";
import WaveComponentHome from "./waveComponent/WaveComponentHome";
import WaveComponentOther from "./waveComponent/WaveComponentOther";
import TitlePage from "./TitlePage/TitlePage";

function Header() {
  const location = useLocation();

  const headFilter = function () {
    console.log(location.pathname);

    if (location.pathname === "/") {
      return <FilterComponent />;
    } else {
      return <TitlePage/>;
    }
  };

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
          <Navbar />
          {headFilter()}
        </div>
      </header>
    </div>
  );
}

export default Header;
