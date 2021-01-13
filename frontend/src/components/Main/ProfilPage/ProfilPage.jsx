import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance, { apiGetCurrentUser, get_user } from "../../Axios/Axios";
import "./ProfilPage.css";
import ProfilPageContent from "./ProfilPageContent/ProfilPageContent";
import ProfilPageLoading from "./ProfilPageLoading/ProfilPageLoading";

/**
 * Composant ProfilPage
 */
function ProfilPage() {
  const history = useHistory();

  // variable d'état
  const [userState, setUserState] = useState({
    user: get_user() ? get_user() : "",
    isLogin: false,
    loading: true,
  });

  /**Fonction pour récupérer le profil de l'utilisateur connecté */
  const get_profil = async () => {
    const data = await apiGetCurrentUser();

    if (data) {
      setUserState({ user: data, isLogin: true, loading: false });
    }
  };

  /**
   * Tant que le composant est monté on execute la fonction get_profil()
   */
  useEffect(() => {
    get_profil();
  }, []);

  return (
    <div className="page profilPage">
      {userState.loading ? (
        <ProfilPageLoading />
      ) : userState.isLogin ? (
        <ProfilPageContent user={userState.user} />
      ) : (
        <div className="profilPage-Logout-container">
          <h2>Vous devez être connecté pour acceder à votre profil</h2>
          <button
            onClick={() => {
              history.replace("/connexion");
            }}
          >
            Se connecter
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilPage;
