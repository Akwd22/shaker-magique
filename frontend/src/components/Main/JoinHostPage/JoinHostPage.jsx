import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./JoinHostPage.css";
import "../../variables.css";
import axiosInstance, { get_user, get_hote, apiJoinHost, APIError } from "../../Axios/Axios";

export default function JoinHostPage() {
  const [hostLogin, setHostLogin] = useState(get_hote() ? get_hote().login : "");
  const [lastError, setLastError] = useState();
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      await apiJoinHost(hostLogin);
      history.push("/");
    } catch (e) {
      setLastError(e.message);
    }
  };

  const handleChange = (e) => {
    setHostLogin(e.target.value);
  };

  return (
    <div className="joinhostpage page">
      <h1 className="joinhostpage-title">Joindre un hôte</h1>
      <input
        className="joinhostpage-input"
        type="text"
        placeholder="Nom d'utilisateur de l'hôte"
        value={hostLogin}
        onChange={handleChange}
      ></input>
      {lastError && <p className="error-msg">{lastError}</p>}
      <button className="joinhostpage-btn" onClick={handleClick}>
        Rejoindre
      </button>
    </div>
  );
}
