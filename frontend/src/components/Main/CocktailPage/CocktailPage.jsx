import React from "react";
import axiosInstance from "../../Axios/Axios";
import "../../variables.css";
import "./CocktailPage.css";
import CocktailPageContent from "./CocktailPageContent/CocktailPageContent";
import CocktailPageLoading from "./CocktailPageLoading/CocktailPageLoading";

class CocktailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      cocktail: undefined,
    };

    this.get_cocktail();
  }

  get_cocktail() {
    axiosInstance
      .get("cocktails/" + this.props.match.params.id + "/")
      .then((response) => {
        this.setState({ loading: false, cocktail: response.data });
      })
      .catch((error) => {
        alert("Erreur HTTP " + error.response.status);
      });
  }

  render() {
    return (
      <div className="page cocktailpage">
        {this.state.loading ? (
          <CocktailPageLoading />
        ) : (
          <CocktailPageContent cocktail={this.state.cocktail} />
        )}
      </div>
    );
  }
}

export default CocktailPage;
