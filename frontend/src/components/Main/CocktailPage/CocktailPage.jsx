import React from "react";
import axiosInstance, { apiGetCocktail } from "../../../Axios";
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

  async get_cocktail() {
    const cocktail = await apiGetCocktail(this.props.match.params.id);
    this.setState({ loading: false, cocktail: cocktail });
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
