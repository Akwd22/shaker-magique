import React from "react";
import "./ScoreBarButton.css";

export default function ScoreBarButton(props) {
  /**
   * Retourne l'icône selon le niveau de remplissage
   * @returns Icône étoile
   */
  const getIcon = () => {
    switch (props.filling) {
      case "empty":
        return <i class="far fa-star"></i>;
      case "half":
        return <i class="fas fa-star-half-alt"></i>;
      case "full":
        return <i class="fas fa-star"></i>;
      default:
        throw new Error(
          `Valeur '${props.filling}' pour props 'filling' invalide`
        );
    }
  };

  return (
    <button
      className={"score-bar-btn" + (props.active ? " score-bar-btn-active" : "")}
      type="button"
      onClick={() => props.onClick(props.index)}
    >
      {getIcon()}
    </button>
  );
}
