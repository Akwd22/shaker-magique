import React, { useEffect, useState } from "react";
import "./AdminEditIngredientInfo.css";

function AdminEditIngredientInfo(props) {
  const [ingredient, setIngredient] = useState(props.ingredient);

  const handleChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

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
