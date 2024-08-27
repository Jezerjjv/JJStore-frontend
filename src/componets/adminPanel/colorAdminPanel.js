import React, { useState } from "react";
import { mutate } from 'swr';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Typography,
    Container,
    IconButton,
    CircularProgress,
    TablePagination,
    InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon, Search as SearchIcon } from '@mui/icons-material';
import { GetColors } from "../../services/colors";
import OutOfService from "../error/outOfService/outOfService";
import { Toaster, toast } from 'sonner'

export const ColorAdminPanel = () => {
    const [newColorName, setNewColorName] = useState('');
    const [newColorCodigo, setNewColorCodigo] = useState('');
    const [editingColor, setEditingColor] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, error } = GetColors();

    const startEditing = (color) => {
        setEditingColor({ ...color });
    };

    const cancelEdit = () => {
        toast.error('Se cancelo la edición');
        setEditingColor(null);
    };

    const addColor = async () => {
        if (newColorCodigo.trim() !== '') {
            const newColor = {
                id: Math.max(0, ...(colors || []).map(c => c.id)) + 1,
                nombre: newColorName.trim(),
                codigo_hex: newColorCodigo
            };

            // Actualización optimista
            mutate('http://localhost:3977/colors',
                { ...data, colors: [...colors, newColor], totalItems: totalCount + 1 }
                , false);

            try {
                const response = await fetch('http://localhost:3977/colors', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newColor)
                });

                if (!response.ok) {
                    toast.error(`Hubo un problema al crear el color ${newColor.nombre}`);
                    throw new Error('Failed to add category');
                }
                toast.success(`Se creo el color ${newColor.nombre} correctamente`);

                // Revalidar los datos
                mutate('http://localhost:3977/colors');
                setNewColorCodigo('');
                setNewColorName('');
            } catch (error) {
                toast.error(`Hubo un problema al crear el color ${newColor.nombre}`);
                console.error('Error adding color:', error);
                // Revertir la actualización optimista
                mutate('/http://localhost:3977/colors');
            }
        }
    }

    const deleteColor = async (id) => {
        mutate(
            'http://localhost:3977/colors',
            { ...data, colors: colors.filter(c => c.id !== id), totalItems: totalCount - 1 },
            false
        );

        try {
            const response = await fetch(`http://localhost:3977/colors/${id}`, {
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
            mutate('/http://localhost:3977/colors');
        }
    };

    const saveEdit = async () => {
        if (editingColor) {
            // Actualización optimista
            mutate(
                'http://localhost:3977/colors',
                colors.map(c => c.id === editingColor.id ? editingColor : c),
                false
            );

            try {
                const response = await fetch(`http://localhost:3977/colors/${editingColor.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingColor)
                });
                if (!response.ok) {
                    toast.error('Fallo la edición del color');
                    throw new Error('Failed to update color');
                }
                toast.success(`Se edito correctamente el color ${editingColor.nombre}`);


                // Revalidar los datos
                mutate('http://localhost:3977/colors');
                setEditingColor(null);
            } catch (error) {
                toast.error('Fallo la edición del color');
                console.error('Error updating color:', error);
                // Revertir la actualización optimista
                mutate('http://localhost:3977/colors');
            }
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    }
    const colors = data != null && data != undefined && data.length > 0 ? data : [];
    const totalCount = colors.length > 0 ? data.length : 0;

    if (error) return <OutOfService />;
    if (!colors) return <CircularProgress />;

    const filteredColors = colors.filter(color =>
        color.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const paginatedColors = filteredColors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Panel Administrativo de Categorías
            </Typography>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <TextField
                    label="Nuevo color"
                    variant="outlined"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    size="small"
                />
                <input
                    type="color"
                    label="Codigo color"
                    value={newColorCodigo}
                    onChange={(e) => setNewColorCodigo(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addColor}>
                    Añadir Categoría
                </Button>
            </div>
            <TextField
                label="Buscar color"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table aria-label="tabla de categorías">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Código</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedColors.map((color) => (
                            <TableRow key={color.id}>
                                <TableCell>{color.id}</TableCell>
                                <TableCell>
                                    {editingColor && editingColor.id === color.id ? (
                                        <TextField
                                            value={editingColor.nombre}
                                            onChange={(e) => setEditingColor({ ...editingColor, nombre: e.target.value })}
                                            fullWidth
                                            size="small"
                                        />
                                    ) : (
                                        color.nombre
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingColor && editingColor.id === color.id ? (
                                        <input
                                            type="color"
                                            value={editingColor.codigo_hex}
                                            onChange={(e) => setEditingColor({ ...editingColor, codigo_hex: e.target.value })}
                                            fullWidth
                                            size="small"
                                        />
                                    ) : (
                                        <input type="color" value={color.codigo_hex} />
                                    )}
                                </TableCell>

                                <TableCell>
                                    {editingColor && editingColor.id === color.id ? (
                                        <>
                                            <IconButton onClick={saveEdit} color="primary" aria-label="guardar cambios">
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton onClick={cancelEdit} color="secondary" aria-label="cancelar edición">
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton onClick={() => startEditing(color)} color="primary" aria-label="editar categoría">
                                                <EditIcon />
                                            </IconButton>
                                            <Toaster richColors />
                                            <IconButton onClick={() => deleteColor(color.id)} color="error" aria-label="eliminar categoría">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Container>
    );
}