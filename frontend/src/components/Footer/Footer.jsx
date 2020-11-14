import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="background-deco"></div>
        <div className="footer-container">
          <div className="footer-container-col1">
            <div className="col1-copyright">Copyright © 2020</div>
            <div className="col1-disclaimer">
              L'abus d'alcool est dangereux pour la santé, consommez avec
              modération. 
            </div>
          </div>
          <div className="footer-container-col2">
            <p>Confidentialité</p>
            <p>Mentions légales</p>
            <p>Cookies</p>
          </div>
        </div>
      </footer>
    );
  }
}
