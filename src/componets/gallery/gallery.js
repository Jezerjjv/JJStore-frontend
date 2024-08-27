import React, { useState } from 'react';
import './gallery.css';

const Gallery = ({ images }) => {
    console.log(images);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="image-gallery">
            <div className="image-container">
                <img src={images[currentIndex]} alt={currentIndex + 1} className="gallery-image" />
            </div>
            <div className="gallery-controls">
                {images.length>1 &&<button onClick={handlePrevClick} className="gallery-btn">❮</button>}
                {images.length>1 &&<button onClick={handleNextClick} className="gallery-btn">❯</button>}
            </div>
            <div className="gallery-dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
