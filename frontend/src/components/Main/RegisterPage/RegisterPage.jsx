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
    user_name: "",
    password: "",
    passwordConfirm: "",
    first_name: "",
    last_name: "",
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
        user_name: formData.user_name,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        first_name: formData.first_name,
        last_name: formData.last_name,
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
          <form className= "left-side-formulaire" noValidate>
            <div className="left-side-form">
              <div className="form-sexe">
                <div className="form-sexe-femme">
                  <input type="radio" name="gender" id="radio-sexe-femme" onChange={handleChange} required/>
                  <label htmlFor="radio-sexe-femme">Mme</label>
                </div>
                <div className="form-sexe-homme">
                  <input type="radio" name="gender" id="radio-sexe-homme" onChange={handleChange} required />
                  <label htmlFor="radio-sexe-femme">Mr</label>
                </div>
              </div>

              <div className="form-name">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Nom"
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Prénom"
                  required
                  onChange={handleChange}
                />
              </div>
              <input type="date" name="birthday" id="birthday" onChange={handleChange} required/>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="Pseudo"
                onChange={handleChange}
                required
              />
              <input type="text" name="email" id="email" placeholder="Email" onChange={handleChange} required/>
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
          </form>
          <div className="left-side-policy">
            <input type="checkbox" id="checkBoxPolicy" required/>
            <label htmlFor="checkBoxPolicy">
              J'ai lu et j'accepte votre{" "}
              <a href="#/">Politique de Confidentialité </a>
            </label>
          </div>
          <div className="left-side-button">
            <button type="submit" onClick={handleSubmit}>
              s'enregister
            </button>
          </div>
        </div>
      </div>
      <div className="page-right-side"></div>
    </div>
  );
}
