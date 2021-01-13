import React, { useEffect } from "react";
import axiosInstance from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

/**
 * Composant Logout
 */
export default function Logout() {
  const history = useHistory(); // avoir l'url

  useEffect(() => {
    // Efface les cookies
    const response = axiosInstance.post("user/logout/blacklist/", { 
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/"); // Redirection vers la page d'accueil une fois déconnecté
  });
  return <div>Logout</div>;
}
