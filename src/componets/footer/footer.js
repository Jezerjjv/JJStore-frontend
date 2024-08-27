import React from "react";
import './footer.css';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-c">
                <div className="footer-social">
                    <a href="/"><i className="fab fa-facebook-f"></i></a>
                    <a href="/"><i className="fab fa-twitter"></i></a>
                    <a href="/"><i className="fab fa-instagram"></i></a>
                    <a href="7"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <div className="footer-copyright">
                    <p>&copy; 2024 JJStore. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    )
}