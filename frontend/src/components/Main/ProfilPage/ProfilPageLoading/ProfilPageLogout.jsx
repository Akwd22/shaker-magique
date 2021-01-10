import React from "react";

function ProfilPageLogout() {
  return (
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
  );
}

export default ProfilPageLogout;
