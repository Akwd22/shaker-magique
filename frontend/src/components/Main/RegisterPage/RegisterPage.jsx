import React, { useState } from "react";
import "./RegisterPage.css";
import "../../variables.css";
import axiosInstance, { apiCreateAccount } from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

/**
 * composant SignUp
 */
export default function SignUp() {
  const history = useHistory(); //avoir l'url
  //Initialisation des données du formulaire à envoyer
  const initialFormData = Object.freeze({
    gender: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    firstname: "",
    lastname: "",
    birthday: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [lastError, setLastError] = useState();

  // Fonction appelé dès le changement des inputs
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // trim() = pour enlever les espaces
      [e.target.name]: e.target.value.trim(),
    });
  };

  /**
   * Fonction appellé dès que le fomulaire est validé
   * @param {*} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      setLastError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await apiCreateAccount({
        gender: formData.gender,
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        first_name: formData.firstname,
        last_name: formData.lastname,
        birthday: formData.birthday,
      });
      history.replace("/connexion");
    } catch (e) {
      setLastError(e.message);
    }
  };

  return (
    <div className="page register-page-component">
      <div className="page-left-side">
        <div className="page-left-side-component">
          <div className="left-side-title">
            <h1>inscription</h1>
          </div>
          <form className="left-side-formulaire" onSubmit={handleSubmit}>
            <div className="left-side-form">
              <div className="form-sexe">
                <div className="form-sexe-femme">
                  <input
                    type="radio"
                    name="gender"
                    id="radio-sexe-femme"
                    value="F"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="radio-sexe-femme">Mme</label>
                </div>
                <div className="form-sexe-homme">
                  <input
                    type="radio"
                    name="gender"
                    id="radio-sexe-homme"
                    value="M"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="radio-sexe-femme">Mr</label>
                </div>
              </div>

              <div className="form-name">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Nom"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Prénom"
                  required
                  onChange={handleChange}
                />
              </div>
              <input type="date" name="birthday" id="birthday" onChange={handleChange} required />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Pseudo"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <span>6 caractères minimum, au moins 1 chiffre et une lettre </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirmer votre mot de passe"
                onChange={handleChange}
                required
              />
            </div>
            {lastError && <p className="error-msg">{lastError}</p>}
            <div className="left-side-policy">
              <input type="checkbox" id="checkBoxPolicy" required />
              <label htmlFor="checkBoxPolicy">
                J'ai lu et j'accepte la <a href="/confidentialite">politique de confidentialité</a>
              </label>
            </div>
            <div className="left-side-button">
              <button type="submit">s'enregister</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="page-right-side"
        alt="Image d'un cocktail coloré a droite de vos informations d'inscriptions"
      ></div>
    </div>
  );
}
