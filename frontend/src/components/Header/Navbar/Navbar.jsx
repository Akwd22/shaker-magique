import React, { useState } from "react";
import "./Navbar.css";

import "../../variables.css";
import Button from "../../Button";
import NavBarMobile from "./NavbarMobile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [classNav, setStateClassNav] = useState("navbar-mobile none");

  const action_bars = (e) => {
    setStateClassNav("navbar-mobile slide_to_left");
  };

  const action_cross = (e) => {
    setStateClassNav("navbar-mobile slide_to_right");
  };
  return (
    <div className="navbar">
      <nav>
        <div className="navbar-container">
          <div className="navbar-logo">
            <i className="fas fa-glass-martini-alt"></i>
            <span className="navbar-logo-title">Shaker Magique</span>
          </div>
          <div className="navbar-navlinks">
            <li>
              <i className="fas fa-user-friends"></i>
              <a>rejoindre un hôte</a>
            </li>
            <li>
              <i className="fas fa-user"></i>
              <a>connexion</a>
            </li>
          </div>
          <Button
            content={<FontAwesomeIcon icon={faBars} />}
            class_name="btn-bars"
            action={action_bars}
          ></Button>
        </div>
        <NavBarMobile class_name={classNav} action_cross={action_cross} />
      </nav>
    </div>
  );
}

export default Navbar;
