import React, { useEffect, useState } from "react";
import axiosInstance, { get_user } from "../../Axios/Axios";
import "./ProfilPage.css";
import ProfilPageContent from "./ProfilPageContent/ProfilPageContent";
import ProfilPageLoading from "./ProfilPageLoading/ProfilPageLoading";

function ProfilPage() {
  const [userState, setUserState] = useState({
    user: get_user() ? get_user() : "",
    isLogin: false,
    loading: true,
  });

  const get_profil = () => {
    axiosInstance
      .patch("user/current/")
      .then((response) => {
        setUserState({ loading: false, isLogin: true, user: response.data });
      })
      .catch((err) => {
        console.dir("Erreur HTTP " + err.response.status);
      });
  };

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
              window.location.href = "/connexion";
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
