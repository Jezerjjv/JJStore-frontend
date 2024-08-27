import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Color } from "../colors/color";
import { Dimensions } from "../dimensions/dimensions";
import { WallapopLink } from "../wallapopLink/wallapopLink";
import Telegram from '../../imagenes/telegram.svg';

import "./accordion.css";

export const Reviews = ({ reviews }) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return stars;
    };
    return (
        <div className="product-reviews">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Reseñas</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <strong>{review.nombre}</strong>
                                <div className="rating">
                                    {renderStars(review.calificacion)}
                                </div>
                                <p>{review.comentario}</p>
                            </div>
                        ))
                    ) : (
                        <p>No hay reseñas aún.</p>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export const DetailProduct = ({ options }) => {
    const productPrice = parseFloat(options.precio);
    const discountedPrice = productPrice - (productPrice * options.descuento) / 100;
    const telegramUsername = "JezerStore";


    const handleTelegramClick = () => {
        window.open(`https://t.me/${telegramUsername}`, '_blank');
    };

    return (
        <Accordion key={options.producto_id} style={{ marginBottom: '10px' }} defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            </AccordionSummary>
            <AccordionDetails>
                <h1>{options.nombre}</h1>

                <p style={{ textAlign: "justify" }}>{options.descripcion}</p>
                {options.descuento > 0 ? (
                    <div className="price-section">
                        <span className="original-price">€{productPrice.toFixed(2)}</span>
                        <span className="discounted-price">€{discountedPrice.toFixed(2)}</span>
                        <span className="discount-label">-{options.descuento}%</span>
                    </div>
                ) : (
                    <span className="price">€{productPrice.toFixed(2)}</span>
                )}
                <hr />
                <Color colors={options.colors} />
                {options.ancho > 0 && options.alto > 0 && options.profundidad > 0 &&
                    <>
                        <hr />
                        <Dimensions ancho={options.ancho} alto={options.alto} profundidad={options.profundidad} />
                    </>
                }
                <hr />
                <div className="purchase-options">
                    <h3>Métodos de compra</h3>
                    <button className="purchase-btn">
                        <WallapopLink link={options.link_wallapop} />
                    </button>
                    <button onClick={handleTelegramClick} className="purchase-btn telegram-btn">
                        <img src={Telegram} alt="Telegram" className="telegram-logo" />
                    </button>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}