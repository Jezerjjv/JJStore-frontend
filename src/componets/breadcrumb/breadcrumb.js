import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa'; // Importa los iconos que deseas usar
import './breadcrumb.css';

const Breadcrumb = ({ currentProduct }) => {
    return (
        <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">
                <FaHome className="breadcrumb-icon" style={{color: "#555 !important"}}/> Inicio
            </Link>
            <span className="breadcrumb-item">
                <FaChevronRight className="breadcrumb-separator" />
                {currentProduct}
            </span>
        </nav>
    );
};

export default Breadcrumb;
