import React, { useState } from "react";
import "./LoginPage.css";
import "../../variables.css";
import axiosInstance, { apiUserConnect } from "../../../Axios";
import { useHistory } from "react-router-dom";

/**
 * Composant SignIn
 */
export default function SignIn() {
  const history = useHistory(); // avoir l'url
  // Valeurs initiales pour le formulaire de connexion
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  //variable détat
  const [formData, updateFormData] = useState(initialFormData);
  const [lastError, setLastError] = useState();

  /**
   * Fonction appelé dès que la valeur des inputs changent
   * @param {*} e
   */
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiUserConnect(formData.username, formData.password);
      history.replace("/");
    } catch (e) {
      setLastError(e.message);
    }
  };

  return (
    <div className="page login-page">
      <div className="lp-left-side">
        <form onSubmit={handleSubmit}>
          <div className="lp-left-side-component">
            <div className="lp-left-side-title">
              <h1>Connexion</h1>
            </div>
            <div className="lp-left-side-form">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Nom d'utilisateur"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                onChange={handleChange}
              />
              {lastError && <p className="error-msg">{lastError}</p>}
            </div>
            <div className="lp-left-side-remember">
              <input type="checkbox" id="checkBoxRemember" />
              <label htmlFor="checkBoxRemember">Se souvenir de moi</label>
            </div>
            <div className="lp-left-side-button">
              <button type="submit">Se connecter</button>
            </div>
          </div>
        </form>
        <div className="lp-left-side-noaccount">
          <span>Vous n'avez pas de compte ?</span>
          <a href="/inscription">Inscription</a>
        </div>
      </div>
      <div
        className="lp-right-side"
        alt="Image d'un cocktail coloré a droite de vos informations de connexion"
      ></div>
    </div>
  );
}
