import React from "react";
import "./RegisterPage.css";
import "../../variables.css";

function RegisterPage() {
  return (
    <div className="page register-page-component">
      <div className="page-left-side">
        <div className="page-left-side-component">
          <div className="left-side-title">
            <h1>inscription</h1>
          </div>
          <div className="left-side-form">
            <div className="form-sexe">
              <div className="form-sexe-femme">
                <input type="radio" name="sexe" id="radio-sexe-femme" />
                <label htmlFor="radio-sexe-femme">Mme</label>
              </div>
              <div className="form-sexe-homme">
                <input type="radio" name="sexe" id="radio-sexe-homme" />
                <label htmlFor="radio-sexe-femme">Mr</label>
              </div>
            </div>

            <div className="form-name">
              <input type="text" name="" id="" placeholder="Nom"/>
              <input type="text" name="" id="" placeholder="Prénom"/>
            </div>
            <input type="date" name="" id=""/>
            <input type="text" name="" id="" placeholder="Pseudo"/>
            <input type="text" name="" id="" placeholder="Email"/>
            <span>6 caractères minimum, au moins 1 chiffre et une lettre </span>
            <input type="text" name="" id="" placeholder="Mot de passe"/>
            <input type="text" name="" id="" placeholder="Confirmer votre mot de passe"/>
          </div>
          <div className="left-side-policy">
            <input type="checkbox" id="checkBoxPolicy" />
            <label htmlFor="checkBoxPolicy">
              J'ai lu et j'accepte votre <a href="#/">Politique de Confidentialité </a>
            </label>
          </div>
          <div className="left-side-button">
            <button type="submit">s'enregister</button>
          </div>
        </div>
      </div>
      <div className="page-right-side"></div>
    </div>
  );
}

export default RegisterPage;
