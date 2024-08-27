import React from 'react';
import AdminPanel from './adminPanel';
import { GetAllProducts, EnabledProduct } from '../../services/product';
import { Loader } from '../loader/loader';
import OutOfService from '../error/outOfService/outOfService';
import { ProductForm } from '../products/productForm/productForm';
import { mutate } from 'swr';
import {toast } from 'sonner'

import {
    Button,
    Box
} from '@mui/material';
const AdminPage = () => {
    const handleEdit = (id) => {
        // Lógica para editar el producto con el id dado
        console.log(`Editar producto con id ${id}`);
    };

    const handleDelete = async (id) => {
        mutate(
            `${process.env.REACT_APP_API}allproducts`,
            { ...data, products: products.filter(c => c.id !== id), totalItems: totalCount - 1 },
            false
        );

        try {
            const response = await fetch(`${process.env.REACT_APP_API}allproducts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                toast.error('Fallo la eliminacion del color');
                throw new Error('Failed to delete color');
            }

            toast.success(`Se ha eliminado el color correctamente`);
            window.location.reload();
        } catch (error) {
            toast.error('Fallo la eliminacion del color');
            console.error('Error deleting color:', error);
            // Revertir la actualización optimista
            mutate(`${process.env.REACT_APP_API}allproducts`);
        }
    };

    const enabledProduct = async (productId) => {
        var product = products.filter((product) => product.producto_id === productId);
        const requestProduct = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                habilitado: !product[0].habilitado
            })
        };
        const r = await EnabledProduct(productId, requestProduct);
        if (r === 200) {
            window.location.reload();
        }

    };

    const isNew = (productId) => {

    };

    const { data, error, isLoading } = GetAllProducts();
    if (isLoading) return <Loader />
    if (error) return <OutOfService />

    const products = data !== null && data !== undefined && data.length > 0 ? data : [];
    const totalCount = products.length > 0 ? data.length : 0;

    return panel(products, handleEdit, handleDelete, enabledProduct, isNew);


    function panel(products, handleEdit, handleDelete) {
        return (
            <div>
                <Box sx={{ padding: { xs: 2, sm: 3 }, margin: "10px" }} display="flex" gap={2}>
                    <ProductForm />

                    <Button href="/panel/categories" variant="contained" color="success" >
                        Nueva categoría
                    </Button>
                    <Button href="/panel/colors" variant="contained" color="success">
                        Nuevo color
                    </Button>
                </Box>
                <h1 style={{ marginLeft: "30px" }}>Panel de Administración</h1>

                <AdminPanel products={products} onEdit={handleEdit} onDelete={handleDelete} enabledProduct={enabledProduct} isNew={isNew} />
            </div>)
    }
};

export default AdminPage;
