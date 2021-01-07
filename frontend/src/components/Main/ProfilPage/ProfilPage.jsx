import React from "react";
import "./ProfilPage.css";
import ProfilPageContent from "./ProfilPageContent/ProfilPageContent";

class ProfilPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        user: undefined,
    };
    
  }

  render() {
    return <div className="page profilPage">
        <ProfilPageContent user={this.state.user}/>
    </div>;
  }
}

export default ProfilPage;
