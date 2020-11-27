import React, { useState } from "react";
import "./RegisterPage.css";
import "../../variables.css";
import axiosInstance from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
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

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // trim() = pour enlever les espaces
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`user/register/`, {
        gender: formData.gender,
        email: formData.email,
        user_name: formData.username,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        first_name: formData.firstname,
        last_name: formData.lastname,
        birthday: formData.birthday,
      })
      .then((res) => {
        history.push("/connexion");
        console.log(res);
        console.log(res.data);
      });
  };
  return (
    <div className="page register-page-component">
      <div className="page-left-side">
        <div className="page-left-side-component">
          <div className="left-side-title">
            <h1>inscription</h1>
          </div>
          <form className="left-side-formulaire"  onSubmit={handleSubmit} noValidate>
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
              <input
                type="date"
                name="birthday"
                id="birthday"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Pseudo"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
              <span>
                6 caractères minimum, au moins 1 chiffre et une lettre{" "}
              </span>
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
            <div className="left-side-policy">
              <input type="checkbox" id="checkBoxPolicy" required />
              <label htmlFor="checkBoxPolicy">
                J'ai lu et j'accepte votre{" "}
                <a href="#/">Politique de Confidentialité </a>
              </label>
            </div>
            <div className="left-side-button">
              <button type="submit">
                s'enregister
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="page-right-side"></div>
    </div>
  );
}
