import React, {useState} from "react";
import './header.css';

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log("hola");
      setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header">
            <div className="header-c">
                <div className="logo">
                <img width="100" height="100" src="https://img.icons8.com/?size=100&id=fawRFUYWiNNC&format=png&color=FFFFFF" alt="3d-printer" />
                <h1>JJStore</h1>
                </div>
                <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/">Productos</a></li>
                        <li><a href="/"><i className="fas fa-sign-in-alt"></i></a></li>
                    </ul>
                </nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
    )
}