import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";

import { ProductForm } from '../componets/products/productForm/productForm';
import Products from '../componets/products/products';
import Page404 from '../componets/error/404/404';
import ProductDetail from '../componets/products/detail/productDetail';
import AdminPage from '../componets/adminPanel/adminPage ';
import Component from '../componets/adminPanel/categoryAdminPanel';
import { ColorAdminPanel } from '../componets/adminPanel/colorAdminPanel';
import LandingPage from '../componets/landingPage/landingPage';

import { Header } from '../componets/header/header';
import { Footer } from '../componets/footer/footer';
import { LandingPage2 } from '../componets/prueba';
const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/products" element={displayPageCommon(<Products />)} />
                <Route path="/product/:productId" element={displayPageCommon(<ProductDetail />)} />
                <Route exact path="/new/product" element={displayPageCommon(<ProductForm />)} />
                <Route exact path="/panel" element={displayPageCommon(<AdminPage />)} />
                <Route exact path="/panel/categories" element={displayPageCommon(<Component />)} />
                <Route exact path="/panel/colors" element={displayPageCommon(<ColorAdminPanel />)} />
                <Route exact path="*" element={displayPageCommon(<Page404 />)} />
            </Routes>
        </Router>

    );
    function displayPageCommon(children) {
        return (
            <>
                <div className='main'>
                    <Header />
                    <div className='container-p'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </>)
    }
}
export default Rutas
