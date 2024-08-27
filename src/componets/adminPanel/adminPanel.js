import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    TextField,
    TablePagination,
    TableFooter,
    Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPanel = ({ products, onEdit, onDelete, enabledProduct, isNew }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredProducts = searchTerm !== undefined && searchTerm !== null && searchTerm.length > 0
        ? products.filter((product) =>
            product.producto_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
        : products;


    return (
        <Box sx={{ padding: 4 }}>
            <TextField
                label="Buscar Producto"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Colores</TableCell>
                            <TableCell>Habilitado</TableCell>
                            <TableCell>¿Es Nuevo?</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow key={product.producto_id}>
                                    <TableCell>{product.producto_nombre}</TableCell>
                                    <TableCell>{product.descripcion}</TableCell>
                                    <TableCell>{product.precio}</TableCell>
                                    <TableCell>
                                        {product.colores.map((color, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    borderRadius: '50%',
                                                    backgroundColor: color,
                                                    display: 'inline-block',
                                                    marginRight: 0.5,
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            checked={product.habilitado}
                                            onChange={() => enabledProduct(product.producto_id)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Checkbox
                                            checked={product.es_nuevo}
                                            onChange={() => isNew(product.producto_id)}
                                            color="primary"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => onEdit(product.producto_id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => onDelete(product.producto_id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={filteredProducts.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage="Filas por página"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminPanel;
