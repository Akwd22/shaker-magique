import React from "react";
import "./JoinHostPage.css";
import "../../variables.css";
import axiosInstance, { get_user, get_hote } from "../../Axios/Axios";

class JoinHostPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      host_login: get_hote() ? get_hote().login : "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const current_user = get_user();

    axiosInstance
      .patch("joindre_hote/" + (current_user ? current_user.id : ""), {
        hote_login: this.state.host_login,
      })
      .then((response) => {
        // Vérifier que l'hôte existe
        if (response.status == 200) {
          // Si le login n'est pas vide, on le rejoint
          if (this.state.host_login != "") {
            localStorage.setItem(
              "hote_rejoint",
              JSON.stringify({
                login: this.state.host_login,
                id: response.data["id_hote"],
              })
            );
            // Si le login est vide, alors on quitte l'hôte
          } else {
            localStorage.removeItem("hote_rejoint");
          }
        }
      })
      .catch((error) => {
        if (error.response.status == 404) {
          alert("L'hôte " + this.state.host_login + " n'existe pas.");
        } else if (error.response.status == 403) {
          alert("Vous ne pouvez pas vous rejoindre vous-même.");
        } else {
          alert("Erreur HTTP inconnue : " + error.response.status);
        }
      });
  }

  handleChange(e) {
    this.setState({
      host_login: e.target.value,
    });
  }

  render() {
    return (
      <div className="joinhostpage page">
        <h1 className="joinhostpage-title">Joindre un hôte</h1>
        <input
          className="joinhostpage-input"
          type="text"
          placeholder="Nom d'utilisateur de l'hôte"
          value={this.state.host_login}
          onChange={this.handleChange}
        ></input>
        <button className="joinhostpage-btn" onClick={this.handleClick}>
          Rejoindre
        </button>
      </div>
    );
  }
}

export default JoinHostPage;
