import React from "react";
import { Component } from "react";
import Pagination from "../Pagination/Pagination";
import CocktailList from "./CocktailList/CocktailList";
import "./HomePage.css";

export default class HomePage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <p className="cocktail-loagind-text">Chargement des cocktails ...</p>
      );
    }
    return (
      <div className="homepage page">
        <div className="cocktailist-wrapper">
          <CocktailList cocktails={this.props.cocktails} />
        </div>
        <div className="pagination-wrapper">
          <Pagination
            postsPerPage={this.props.postsPerPage}
            totalPosts={this.props.totalPosts}
            paginate={this.props.paginate}
            nextPage={this.props.nextPage}
            prevPage={this.props.prevPage}
          />
        </div>
      </div>
    );
  }
}
