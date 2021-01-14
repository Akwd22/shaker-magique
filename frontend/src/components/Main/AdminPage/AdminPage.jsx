import React from "react";
import { useHistory } from "react-router-dom";
import { usePermission } from "../../../Axios";
import "./AdminPage.css";

export default function AdminPage() {
  const isAdmin = usePermission("admin");
  const history = useHistory();

  if (!isAdmin) history.replace("/");

  return (
    <div className="page admin-page">
      {isAdmin && (
        <div className="admin-page-container">
          <h1>Menu</h1>
          <button
            type="button"
            onClick={(e) => {
              history.push("/admin/cocktails");
            }}
          >
            Liste des cocktails
          </button>
          <button
            type="button"
            onClick={(e) => {
              history.push("/admin/ingredients");
            }}
          >
            Liste des ingrédients
          </button>
        </div>
      )}
    </div>
  );
}
