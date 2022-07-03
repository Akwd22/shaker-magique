import React, { useRef, useState } from "react";
import "../ProfilPage.css";
import iconProfil from "../../../../assets/imgs/iconProfil.png";
import cocktail from "../../../../assets/imgs/cocktail.png";
import orangejuice from "../../../../assets/imgs/orangejuice.png";
import axiosInstance, { apiUpdateUserProfile } from "../../../../Axios";
import { useHistory } from "react-router-dom";

/**
 * Composant ProfilPageContent
 * @param {*} props
 */
export default function ProfilPageContent(props) {
  const pseudoInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [lastError, setLastError] = useState();
  const history = useHistory();

  /**
   * Fonction appelé lorsque le formulaire est validé
   * @param {*} e
   */
  const handle_submit = async (e) => {
    e.preventDefault();

    try {
      await apiUpdateUserProfile({
        user_name: pseudoInputRef.current.value, //On envoie les informations que l'on souhaite modfier
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value
          ? passwordInputRef.current.value //Si on ne modifie pas le mot de passe
          : undefined, // On envoie pas le champs "password"
      });

      window.location.reload();
    } catch (e) {
      setLastError(e.message);
    }
  };

  /** Fonction de redirection  */
  const routeChangeLogOut = () => {
    let path = `/deconnexion`;
    history.push(path);
  };

  const routeChangeHostCocktails = () => {
    let path = "/hote/cocktails";
    history.push(path);
  };

  const routeChangeHostIngredients = () => {
    let path = "/hote/ingredients";
    history.push(path);
  };

  return (
    <div className="profilPage-container">
      <div className="profilPage-left-container">
        <div className="profilPage-left-container-icon-container">
          <img
            className="profilPage-left-container-icon"
            src={iconProfil}
            alt="Icon de décoration pour votre profil"
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
                ref={pseudoInputRef}
              />
            </div>
            <div className="profilPage-left-container-infos-row">
              <span>Email</span>
              <input
                type="mail"
                placeholder="a@a.fr"
                defaultValue={props.user.email}
                ref={emailInputRef}
              />
            </div>
            <div className="profilPage-left-container-infos-row">
              <span>Mot de passe</span>
              <input
                type="password"
                placeholder="Entrer un nouveau mot de passe"
                ref={passwordInputRef}
              />
            </div>
            {lastError && <p className="error-msg">{lastError}</p>}
          </form>
          <div className="left-container-last-row">
            <div className="profilPage-left-form-button">
              <button type="submit" onClick={handle_submit}>
                Sauvegarder
              </button>
            </div>
            <i className="fas fa-sign-out-alt" onClick={routeChangeLogOut}></i>
          </div>
        </div>
      </div>
      <div className="profilPage-right-container">
        <div className="right-container-infos">
          <div className="right-container-infos-row">
            <img
              className="img-righ-container img-rigt-1"
              src={cocktail}
              alt="Icone symbolisant un cocktail "
            />
            <button onClick={routeChangeHostCocktails}>Consulter sa liste de cocktails</button>
          </div>
          <div className="right-container-infos-row">
            <img
              className="img-righ-container img-rigt-2"
              src={orangejuice}
              alt="Icone symbolisant un fruit"
            />
            <button onClick={routeChangeHostIngredients}>Consulter sa liste d'ingrédients</button>
          </div>
        </div>
      </div>
    </div>
  );
}
