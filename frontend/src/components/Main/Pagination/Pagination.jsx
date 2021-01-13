import React, { Component } from "react";
import "./Pagination.css";

/**
 * Composant Pagination
 */
export class Pagination extends Component {
  render() {
    // Valiables utile pour la pagination
    const {
      postsPerPage,
      totalPosts,
      paginate,
      nextPage,
      prevPage,
    } = this.props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="pagination-container">
        <ul className="pagination pagination-container">
          <div className="wrapper-link">
            <li className="page-item">
              <a className="page-link" href="\#" onClick={() => prevPage()}>
                précédent
              </a>
            </li>
            {pageNumbers.map((num) => (
              <li className="page-item" key={num}>
                <a onClick={() => paginate(num)} href="\#" className="page-link">
                  {num}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="\#" onClick={() => nextPage()}>
                suivant
              </a>
            </li>
          </div>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
