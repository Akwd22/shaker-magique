import React from "react";
import CocktailBox from "../CocktailBox_GRID/CocktailBox"
import "./CocktailList.css";
import "../../../variables.css";
import Axios from "axios";

class CocktailList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    this.getCocktails()
  }

  async getCocktails() {
    await Axios.get('/api/cocktails')
    .then(response => this.setState({cocktails: response.data}))
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="cocktaillist">
        <div className="title-page">
          <h1>vos cocktails</h1>
        </div>
        <div className="list-cocktail">
           {this.state.cocktails && (<CocktailBox cocktail={this.state.cocktails[0]}/>)}
        </div>
      </div>
    );
  }
}

export default CocktailList;
