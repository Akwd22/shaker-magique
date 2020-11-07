import React, { useState } from "react";
import "./Navbar.css";
import "../variables.css";

function Navbar() {
  // Hook return un tableau ["État du composant", "fonction qui va modifier l'état"] et prend en paramètre létat initiale du composant
  // Les hooks fonctionneront toujours sur ce modèle

  //Hook : const["État du composant", "fonction qui va modifier l'état"] = useState("État initial du composant")
  // Un useState ne peux pas être dans un composant ou dans une boucle sinon cela change l'ordre des appel et peux poser des problèmes aux niveau des Hooks

  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-logo">
          <i className="fas fa-glass-martini-alt"></i>
          Shaker Magique
        </div>{" "}
        {/*navbar-logo*/}
        <ul
          className="navbar-links"
          /*Si on click sur le bouton hamburger on ouvre le menu en mode responsive*/
          style={{ transform: open ? "translateX(0px)" : "" }}
        >
          <li>
            <a>Accueil</a>
          </li>
          <li >
            <i className="fas fa-user-friends"></i>
            <a>Rechercher un hôte</a>
          </li>
          <li>
            <i className="fas fa-user"></i>
            <a>Connexion</a>
          </li>
        </ul>{" "}
        {/*navbar-logo*/}
        <i
          onClick={() => setOpen(!open)}
          className="fas fa-bars navbar-burger"
        ></i>
      </nav>{" "}
      {/*nav*/}
    </div> //navbar
  );
}

export default Navbar;
