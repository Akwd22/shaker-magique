
import React from 'react'
import "./NavbarMobile.css"
import "../../variables.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const NavBarMobile = ({class_name, action_cross}) => {

    return(
        <div className={class_name}>
            <div className="container-nav-mobile">
                <div><a href="">Accueuil</a></div>
                <div><a href="">rejoindre un hote</a></div>
                <div><a href="">connexion</a></div>
            </div>
            <FontAwesomeIcon icon={faTimes} className="cross-icon" onClick={action_cross}/>
        </div>
    )
}

export default NavBarMobile;