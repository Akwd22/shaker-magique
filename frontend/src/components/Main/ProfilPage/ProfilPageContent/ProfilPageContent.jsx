import React from "react";
import "./ProfilPageContent.css";
import iconProfil from "../../../../assets/imgs/iconProfil.png";
import cocktail from "../../../../assets/imgs/cocktail.png";
import orangejuice from "../../../../assets/imgs/orangejuice.png";


class ProfilPageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                <input type="text" placeholder="Pseudo" />
              </div>
              <div className="profilPage-left-container-infos-row">
                <span>Email</span>
                <input type="mail" placeholder="a@a.fr" />
              </div>
              <div className="profilPage-left-container-infos-row">
                <span>Mot de passe</span>
                <input
                  type="password"
                  placeholder="Entrer un nouveau mot de passe"
                />
              </div>
            </form>
            <div className="left-container-last-row">
              <div className="profilPage-left-form-button">
                <button type="submit">Sauvegarder</button>
              </div>
              <i class="fas fa-sign-out-alt"></i>
            </div>
          </div>
        </div>
        <div className="profilPage-right-container">
          <div className="right-container-infos">
            <div className="right-container-infos-row">
              <img className="img-righ-container"src={cocktail} alt=""/>
              <button>Consulter sa liste de cocktails</button>
            </div>
            <div className="right-container-infos-row">
              <img className="img-righ-container" src={orangejuice} alt=""/>
              <button>Consulter sa liste d'ingrédients</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilPageContent;
