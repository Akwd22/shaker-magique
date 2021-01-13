import React, { useEffect } from "react";
import axiosInstance, { apiUserLogout } from "../../Axios/Axios";
import { useHistory } from "react-router-dom";

/**
 * Composant Logout
 */
export default function Logout() {
  const history = useHistory();

  useEffect(() => {
    apiUserLogout();
    history.replace("/");
  }, []);

  return <div>Page de déconnexion</div>;
}
