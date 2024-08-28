import React, { useState } from "react";
import { motion } from 'framer-motion';
import './header.css';


export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header">
            <div className="header-c">
                <a href="/" className="color-white">
                    <div className="flex items-center space-x-3">
                        <motion.svg
                            width="100"
                            height="100"
                            viewBox="0 0 200 200"
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Base de la impresora */}
                            <motion.rect
                                x="40"
                                y="160"
                                width="120"
                                height="20"
                                fill="#ffffff"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 }
                                }}
                                transition={{ duration: 0.5 }}
                            />
                            {/* Marco de la impresora */}
                            <motion.path
                                d="M 50,160 L 50,60 L 150,60 L 150,160"
                                stroke="#ffffff"
                                strokeWidth="10"
                                fill="none"
                                variants={{
                                    hidden: { pathLength: 0 },
                                    visible: { pathLength: 1 }
                                }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            />
                            {/* Objeto impreso (cubo) */}
                            <motion.path
                                d="M 80,160 L 80,110 L 120,110 L 120,160 Z"
                                fill="#ffffff"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                            />
                            <motion.path
                                d="M 80,110 L 100,90 L 140,90 L 120,110 Z"
                                fill="#ffffff"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                            />
                            <motion.path
                                d="M 120,110 L 140,90 L 140,140 L 120,160 Z"
                                fill="#ffffff"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 2 }}
                            />
                            {/* Cabezal de impresión */}
                            <motion.rect
                                x="70"
                                y="70"
                                width="60"
                                height="10"
                                fill="#ffffff"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, x: [0, 20, 0] }}
                                transition={{ duration: 2, delay: 2.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                        </motion.svg>
                        <motion.span
                            className="text-xl font-bold"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2.5 }}
                        >
                            <motion.span
                                initial={{ display: "inline-block" }}
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 5 }}
                            >
                                JJ
                            </motion.span>
                            {"Store"}
                        </motion.span>
                    </div>
                </a>
                <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><a className="color-white" href="/">Inicio</a></li>
                        <li><a className="color-white" href="/products">Productos</a></li>
                        <li><a  className="color-white" href="/"><i className="fas fa-sign-in-alt"></i></a></li>
                    </ul>
                </nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </div>
    )
}