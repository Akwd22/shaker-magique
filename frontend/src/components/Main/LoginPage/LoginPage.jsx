import React from "react";
import "./LoginPage.css";
import "../../variables.css";

function LoginPage() {
  return (
    <div className="page login-page">
      <div className="lp-left-side">
        <div className="lp-left-side-component">
          <div className="lp-left-side-title">
            <h1>Connexion</h1>
          </div>
          <div className="lp-left-side-form">
            <input type="text" name="" id="" placeholder="Nom d'utilisateur" />
            <input type="password" name="" id="" placeholder="Mot de passe" />
          </div>
          <div className="lp-left-side-remember">
            <input type="checkbox" id="checkBoxRemember" />
            <label htmlFor="checkBoxRemember">Se souvenir de moi</label>
          </div>
          <div className="lp-left-side-button">
            <button type="submit">Se connecter</button>
          </div>
          <div className="lp-left-side-noaccount">
            Vous n'avez pas de compte ?<a href="/inscription">Inscription</a>
          </div>
        </div>
      </div>
      <div className="lp-right-side"></div>
    </div>
  );
}

export default LoginPage;
