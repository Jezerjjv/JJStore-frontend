import React, { useState } from 'react';
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
import { GetCategories } from '../../services/categories';
import { Toaster, toast } from 'sonner'

// Función fetcher para SWR

export default function CategoryAdminPanelMUI() {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // Usar SWR para obtener las categorías
  const { data, error } = GetCategories();


  const addCategory = async () => {
    if (newCategoryName.trim() !== '') {
      const newCategory = {
        id: Math.max(0, ...(categories || []).map(c => c.id)) + 1,
        nombre: newCategoryName.trim()
      };

      // Actualización optimista
      mutate(`${process.env.REACT_APP_API}categories`,
        { ...data, categories: [...categories, newCategory], totalItems: totalCount + 1 }
        , false);

      try {
        const response = await fetch(`${process.env.REACT_APP_API}categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCategory)
        });

        if (!response.ok) {
          toast.error(`Hubo un problema al crear la categoria ${newCategory.nombre}`);
          throw new Error('Failed to add category');
        }
        toast.success(`Se creo la categoria ${newCategory.nombre} correctamente`);

        // Revalidar los datos
        mutate('http://localhost:3977/categories');
        setNewCategoryName('');
      } catch (error) {
        toast.error(`Hubo un problema al crear la categoria ${newCategory.nombre}`);
        console.error('Error adding category:', error);
        // Revertir la actualización optimista
        mutate(`${process.env.REACT_APP_API}categories`);
      }
    }
  };

  const startEditing = (category) => {
    setEditingCategory({ ...category });
  };

  const saveEdit = async () => {
    if (editingCategory) {
      // Actualización optimista
      mutate(
        `${process.env.REACT_APP_API}categories`,
        categories.map(c => c.id === editingCategory.id ? editingCategory : c),
        false
      );

      try {
        const response = await fetch(`${process.env.REACT_APP_API}categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingCategory)
        });
        if (!response.ok) {
          toast.error('Fallo la edición de la categoria');
          throw new Error('Failed to update category');
        }
        toast.success(`Se edito correctamente la categoria ${editingCategory.nombre}`);


        // Revalidar los datos
        mutate(`${process.env.REACT_APP_API}categories`);
        setEditingCategory(null);
      } catch (error) {
        toast.error('Fallo la edición de la categoria');
        console.error('Error updating category:', error);
        // Revertir la actualización optimista
        mutate(`${process.env.REACT_APP_API}categories`);
      }
    }
  };

  const cancelEdit = () => {
    toast.error('Se cancelo la edición');
    setEditingCategory(null);
  };

  const deleteCategory = async (id) => {
    // Actualización optimista
    mutate(
      `${process.env.REACT_APP_API}categories`,
      { ...data, categories: categories.filter(c => c.id !== id), totalItems: totalCount - 1 },
      false
    );

    try {
      const response = await fetch(`${process.env.REACT_APP_API}categories/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        toast.error('Fallo la eliminacion de la categoria');
        throw new Error('Failed to delete category');
      }

      toast.success(`Se ha eliminado la categoria correctamente`);
      window.location.reload();
    } catch (error) {
      toast.error('Fallo la eliminacion de la categoria');
      console.error('Error deleting category:', error);
      // Revertir la actualización optimista
      mutate(`${process.env.REACT_APP_API}categories`);
    }
  };

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

  const categories = data !== null && data !== undefined && data.length > 0 ? data : [];
  const totalCount = categories.length > 0 ? data.length : 0;

  if (error) return <Typography color="error">Error al cargar las categorías</Typography>;
  if (!categories) return <CircularProgress />;

  const filteredCategories = categories.filter(category =>
    category.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Panel Administrativo de Categorías
      </Typography>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <TextField
          label="Nueva categoría"
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          size="small"
        />
        <Toaster richColors />
        <Button variant="contained" color="primary" onClick={addCategory}>
          Añadir Categoría
        </Button>
      </div>

      <TextField
        label="Buscar categoría"
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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  {editingCategory && editingCategory.id === category.id ? (
                    <TextField
                      value={editingCategory.nombre}
                      onChange={(e) => setEditingCategory({ ...editingCategory, nombre: e.target.value })}
                      fullWidth
                      size="small"
                    />
                  ) : (
                    category.nombre
                  )}
                </TableCell>
                <TableCell>
                  {editingCategory && editingCategory.id === category.id ? (
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
                      <IconButton onClick={() => startEditing(category)} color="primary" aria-label="editar categoría">
                        <EditIcon />
                      </IconButton>
                      <Toaster richColors />
                      <IconButton onClick={() => deleteCategory(category.id)} color="error" aria-label="eliminar categoría">
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