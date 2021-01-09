import React, { useRef } from "react";
import "../ProfilPage.css";
import iconProfil from "../../../../assets/imgs/iconProfil.png";
import cocktail from "../../../../assets/imgs/cocktail.png";
import orangejuice from "../../../../assets/imgs/orangejuice.png";
import axiosInstance from "../../../Axios/Axios";
import { useHistory } from "react-router-dom";

export default function ProfilPageContent(props) {

  const pseudoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const history = useHistory();

  const handle_submit = (e) => {
    e.preventDefault();
    axiosInstance
      .patch("user/current/", {
        user_name: pseudoInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value ? passwordInputRef.current.value : undefined,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  const routeChange = () =>{ 
    let path = `/deconnexion`; 
    history.push(path);
  }

  {
    return (
      <div className="profilPage-container">
        <div className="profilPage-left-container">
          <div className="profilPage-left-container-icon-container">
            <img
              className="profilPage-left-container-icon"
              src={iconProfil}
              alt=""
            />
          </div>
          <div className="profilPage-left-container-infos">
            <form className="profilPage-left-form">
              <div className="profilPage-left-container-infos-row">
                <span>Pseudo</span>
                <input
                  type="text"
                  placeholder="Pseudo"
                  defaultValue={props.user.user_name}
                  ref = {pseudoInputRef}
                />
              </div>
              <div className="profilPage-left-container-infos-row">
                <span>Email</span>
                <input
                  type="mail"
                  placeholder="a@a.fr"
                  defaultValue={props.user.email}
                  ref = {emailInputRef}
                />
              </div>
              <div className="profilPage-left-container-infos-row">
                <span>Mot de passe</span>
                <input
                  type="password"
                  placeholder="Entrer un nouveau mot de passe"
                  ref = {passwordInputRef}
                />
              </div>
            </form>
            <div className="left-container-last-row">
              <div className="profilPage-left-form-button">
                <button type="submit" onClick={handle_submit} >Sauvegarder</button>
              </div>
              <i class="fas fa-sign-out-alt" onClick={routeChange}></i>
            </div>
          </div>
        </div>
        <div className="profilPage-right-container">
          <div className="right-container-infos">
            <div className="right-container-infos-row">
              <img className="img-righ-container" src={cocktail} alt="" />
              <button>Consulter sa liste de cocktails</button>
            </div>
            <div className="right-container-infos-row">
              <img className="img-righ-container" src={orangejuice} alt="" />
              <button>
                Consulter sa liste d'ingrédients
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
