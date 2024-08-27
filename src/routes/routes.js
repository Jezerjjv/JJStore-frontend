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
import Prueba from '../componets/prueba';

const Rutas = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Products />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route exact path="/new/product" element={<ProductForm />} />
                <Route exact path="/panel" element={<AdminPage />} />
                <Route exact path="/panel/categories" element={<Component />} />
                <Route exact path="/prueba" element={<Prueba />} />
                <Route exact path="/panel/colors" element={<ColorAdminPanel />} />
                <Route exact path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}
export default Rutas
