import React, { useEffect, useState } from "react";
import "./AdminEditIngredientInfo.css";

/**
 * Composant AdminEditIngredientInfo
 * @param {*} props 
 */
function AdminEditIngredientInfo(props) {
  //Etat pour avoir l'ingredient selectionné
  const [ingredient, setIngredient] = useState(props.ingredient);

  //Fonction appelé dès que l'on change les valeurs de l'ingredient séléctionné
  const handleChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

  /**
   * Hooks d'éffets appelés dès que le composant est monté
   */
  useEffect( () => props.onChange(ingredient), [ingredient]);

  useEffect(() => setIngredient(props.ingredient), [props.ingredient]);


  return (
    <div className="admin-edit-ingredient-info">
      <input
        type="text"
        name="intitule"
        placeholder="Nom de l'ingredient"
        value={ingredient.intitule}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="degrealcool"
        min="0"
        placeholder="Force"
        value={ingredient.degrealcool}
        onChange={handleChange}
        required
      />
    </div>
  );
}

export default AdminEditIngredientInfo;
