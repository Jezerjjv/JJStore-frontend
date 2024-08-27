import React from "react";
import "./wallapopLink.css"
import WallapopLogo from '../../imagenes/wallapop.png'; // Ruta local


export const WallapopLink = ({ link }) => {
    return (<a href={link} target="_blank" rel="noopener noreferrer" className="wallapop-link">
        <img src={WallapopLogo} alt="Wallapop" className="wallapop-logo" />
    </a>)
}