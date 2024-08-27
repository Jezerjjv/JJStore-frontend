import React from "react";
import './dimensions.css';

export const Dimensions = ({ ancho, alto, profundidad }) => {
    return (
        <div className="product-dimensions">
            <h3>Dimensiones del producto</h3>
            <p><strong>Alto:</strong> {alto !==undefined && alto !== null && alto !== 0 ?`${alto}cm`:"N/A" }</p>
            <p><strong>Ancho:</strong> {ancho !== undefined && ancho !== null && ancho !== 0?`${ancho}cm`:"N/A" }</p>
            <p><strong>Profundidad:</strong> {profundidad !== undefined && profundidad !== null && profundidad !== 0 ? `${profundidad}cm`:"N/A" }</p>
        </div>
    )
}