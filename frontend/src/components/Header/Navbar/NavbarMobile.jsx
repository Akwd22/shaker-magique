import React, { useEffect, useState } from "react";
import "./NavbarMobile.css";
import "../../variables.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import { get_user } from "../../Axios/Axios";

const NavBarMobile = ({ class_name, action_cross }) => {
  const [user, setUser] = useState(get_user());

  const log_buttons = function () {
    if (user) {
      return (
        <NavLink to="/deconnexion">
          <li>
            <i className="fas fa-user"></i>
            <a href="#/">Déconnexion</a>
          </li>
        </NavLink>
      );
    } else {
      return (
        <NavLink to="/connexion">
          <li>
            <i className="fas fa-user"></i>
            <a href="#/">Connexion</a>
          </li>
        </NavLink>
      );
    }
  };

  useEffect(() => {
    if (get_user() !== user) {
      setUser(get_user());
    }
  });

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
        <div>{log_buttons()}</div>
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
