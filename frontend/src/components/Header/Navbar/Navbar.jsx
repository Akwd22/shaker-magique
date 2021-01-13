import React, { useState, useEffect } from "react";
import "./Navbar.css";

import "../../variables.css";
import Button from "../../Button";
import NavBarMobile from "./NavbarMobile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import { get_user, is_logged } from "../../Axios/Axios";

/**
 * Composant Navbar
 */
function Navbar() {
  //Etat qui change la classe de la navbar pour pouvoir s'adapter lorsque l'on est sur un format mobile
  const [classNav, setStateClassNav] = useState("navbar-mobile none");
  // Etat pour savoir si l'utilisateur est connecté
  const [user, setUser] = useState(get_user());

  // Fonction appellé lorsque l'on clique sur le bouton hamburger en format mobile
  const action_bars = (e) => {
    e.preventDefault();
    setStateClassNav("navbar-mobile slide_to_left");
  };

    // Fonction appellé lorsque l'on re-clique sur le bouton hamburger pour fermer la sidebar en format mobile
  const action_cross = (e) => {
    e.preventDefault();
    setStateClassNav("navbar-mobile slide_to_right");
  };

  // Fonction d'affichage conditionnel, on change les composant de la navbar si on est connecté ou non
  const log_buttons = function () {
    //Si on est connecté
    if (user) {
      return (
        <div className="profil-logOut-container">
          <NavLink to="/profil">
            <li>
              <i className="fas fa-user"></i>
              <a href="#/">Profil</a>
            </li>
          </NavLink>
          <NavLink to="/deconnexion">
            <li>
              <i className="fas fa-user"></i>
              <a href="#/">Déconnexion</a>
            </li>
          </NavLink>
        </div>
      );
    } else {
      // Déconnecté
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

  //Hook d'effet appellé dès que le composant est monté 
  useEffect(() => {
    if (get_user() !== user) {
      setUser(get_user());
    }
  }, [is_logged()]);

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-container">
          <NavLink to="/">
            <div className="navbar-logo">
              <i className="fas fa-glass-martini-alt"></i>
              <span className="navbar-logo-title">Shaker Magique</span>
            </div>
          </NavLink>
          <div className="navbar-navlinks">
            <NavLink to="/rejoindre-hote">
              <li>
                <i className="fas fa-user-friends"></i>
                <a href="#/">rejoindre un hôte</a>
              </li>
            </NavLink>
            {log_buttons()}
          </div>
          <Button
            content={<FontAwesomeIcon icon={faBars} />}
            class_name="btn-bars"
            action={action_bars}
          ></Button>
        </div>
      </nav>
      <NavBarMobile class_name={classNav} action_cross={action_cross} />
    </div>
  );
}

export default Navbar;
