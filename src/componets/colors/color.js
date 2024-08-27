import React from "react";
import './color.css';

export const Color = ({ colors }) => {
    return (

        <div className="product-colors">
             <h3>Color</h3>
            <div className="filament-options">
           
                {
                    colors.map((color, index) => (
                        <div
                            key={index}
                            className="filament-swatch"
                            style={{ backgroundColor: color }}
                        >
                            <div className="filament-spool"></div>
                        </div>
                    ))}
            </div>
        </div>
    );
}