import React from "react";
import "./NavbarMobile.css";
import "../../variables.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";


const NavBarMobile = ({ class_name, action_cross }) => {
  return (
    <div className={class_name}>
      <div className="container-nav-mobile">
        <NavLink className="container-nav-mobile-div" to="/">
        <div>
          <i className="fas fa-glass-martini-alt"></i>
          <a href="#/">accueil</a>
        </div>
        </NavLink>
        <NavLink className="container-nav-mobile-div" to="/rejoindre-hote">
        <div>
          <i className="fas fa-user-friends"></i>
          <a href="#/">rejoindre un hote</a>
        </div>
        </NavLink>
        <NavLink className="container-nav-mobile-div" to="connexion">
        <div>
          <i className="fas fa-user"></i>
          <a href="#/">connexion</a>
        </div>
        </NavLink>
        <NavLink className="container-nav-mobile-div" to="inscription">
        <div>
          <i className="fas fa-user"></i>
          <a href="#/">inscription</a>
        </div>
        </NavLink>
      </div>
      <FontAwesomeIcon
        icon={faTimes}
        className="cross-icon"
        onClick={action_cross}
      />
    </div>
  );
};

export default NavBarMobile;
