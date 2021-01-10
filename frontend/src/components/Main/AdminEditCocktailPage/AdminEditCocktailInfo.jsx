import React from "react";
import { apiGetCocktails } from "../../Axios/Axios";
import { get_user, is_logged, usePermission } from "../../Axios/Axios";
import "./AdminEditCocktailInfo.css";

function AdminEditCocktailInfo(props) {
  const [cocktail, setCocktail] = React.useState({});
  const [image, setImage] = React.useState();

  const handleUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setCocktail({ ...cocktail, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    props.onChange(cocktail, image);
  }, [cocktail, image]);

  return (
    <div className="admin-edit-cocktail-info">
      <div
        className="admin-edit-cocktail-info-col1"
        style={{
          backgroundImage: image
            ? `url(${window.URL.createObjectURL(image)})`
            : "",
        }}
      >
        <label for="upload">
          <i class="fas fa-upload"></i>
        </label>
        <input
          type="file"
          id="upload"
          accept="image/png, image/jpeg, image/gif, image/bmp"
          onChange={handleUpload}
        />
      </div>
      <div className="admin-edit-cocktail-info-col2">
        <input
          type="text"
          name="intitule"
          placeholder="Titre du cocktail"
          onChange={handleChange}
          required
        />
        <div className="admin-edit-cocktail-info-cat">
          <input
            id="aperitif"
            name="categorie"
            type="radio"
            value="A"
            onChange={handleChange}
            required
          />
          <label for="aperitif">Apéritif</label>
          <input
            id="digestif"
            name="categorie"
            type="radio"
            value="D"
            onChange={handleChange}
          />
          <label for="digestif">Digestif</label>
          <input
            id="lesdeux"
            name="categorie"
            type="radio"
            value="AD"
            onChange={handleChange}
          />
          <label for="lesdeux">Les deux</label>
        </div>
        <textarea
          name="description"
          placeholder="Description du cocktail. Les balises HTML sont utilisables."
          onChange={handleChange}
        />
        <input
          type="number"
          name="forcealc"
          min="0"
          placeholder="Force"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
}

export default AdminEditCocktailInfo;
