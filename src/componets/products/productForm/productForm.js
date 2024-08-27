import React, { useState } from 'react'
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    IconButton,
    Grid,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { GetCategories } from '../../../services/categories';
import { Loader } from '../../loader/loader';
import OutOfService from '../../error/outOfService/outOfService';
import { GetColors } from '../../../services/colors';
import { SaveProduct } from '../../../services/product';

export const ProductForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addImageUrlField = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleImageUrlChange = (index, value) => {
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls[index] = value;
        setImageUrls(updatedImageUrls);
        values["imageUrls"] = updatedImageUrls;
    };

    const validateForm = () => {
        const newErrors = {};
        if (!values.nombre) newErrors.nombre = 'El nombre del producto es obligatorio.';
        if (!values.precio || isNaN(values.precio)) newErrors.precio = 'El precio debe ser un número válido.';
        if (!values.categoria_id) newErrors.categoria_id = 'La categoría es obligatoria.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const onSubmit = (product) => {
        const requestProduct = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                values: values
            })
        };
        SaveProduct(requestProduct)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            values["selectedColors"] = selectedColors;
            onSubmit(values);
        }
        setValues({
            nombre: "",
            descripcion: "",
            precio: 0,
            categoria_id: "",
            descuento: 0,
            es_nuevo: false,
            profundidad: "",
            ancho: "",
            alto: "",
            habilitado: false,
            link_wallapop: "",
            imageUrls: [],
            selectedColors: []
        })
        handleClose();
    };


    function handleChange(evt) {
        const { target } = evt;
        var { name, value } = target;
        if (name === 'es_nuevo' || name === 'habilitado') value = target.checked
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
        console.log(values);
    }

    const handleColorChange = (color) => {
        if (!selectedColors.includes(color)) {
            setSelectedColors(oldArray => [...oldArray, color]);
        }
    };

    const [imageUrls, setImageUrls] = useState(['']);
    const [errors, setErrors] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);

    const [values, setValues] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        categoria_id: "",
        descuento: 0,
        es_nuevo: false,
        profundidad: "",
        ancho: "",
        alto: "",
        habilitado: false,
        link_wallapop: "",
        imageUrls: [],
        selectedColors: []
    })

    const { data: categories, error, isLoading } = GetCategories();
    const { data: colors, error: errorColors, isLoading: isLoadingColors } = GetColors();
    if (isLoading || isLoadingColors) return <Loader />
    if (error || errorColors) return <OutOfService />
    return form();

    function form() {
        return (
            <>
                <Button onClick={handleOpen} variant="contained" color="success">
                    Nuevo producto
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            overflow: "scroll",
                            maxHeight: 900,
                            maxWidth: { xs: 300, sm: 500, md: 900 },
                            margin: '0 auto',
                            padding: { xs: 2, sm: 3 },
                            backgroundColor: '#f5f5f5',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h4" mb={3}>
                            Crear Producto
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>

                                <TextField
                                    id="nombre"
                                    name="nombre"
                                    label="Nombre del Producto"
                                    value={values.nombre}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.nombre}
                                    helperText={errors.nombre}
                                />
                            </Grid>
                            <Grid item xs={6}>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Categoría</InputLabel>
                                    <Select
                                        id="categoria_id"
                                        name="categoria_id"
                                        value={values.categoria_id}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">Selecciona una categoría</MenuItem>
                                        {categories.map(category => {
                                            return <MenuItem key={category.id} value={category.id}>{category.nombre}</MenuItem>
                                        })}
                                    </Select>
                                    {errors.categoria_id && <Typography color="error">{errors.categoria_id}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="descripcion"
                                    name="descripcion"
                                    label="Descripción"
                                    value={values.descripcion}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="link_wallapop"
                                    name="link_wallapop"
                                    label="Link Wallapop"
                                    value={values.link_wallapop}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <TextField
                                    label="Precio"
                                    id="precio"
                                    name="precio"
                                    type="number"
                                    value={values.precio}
                                    onChange={handleChange}
                                    margin="normal"
                                    error={!!errors.precio}
                                    helperText={errors.precio}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label="Descuento"
                                    id="descuento"
                                    name="descuento"
                                    type="number"
                                    value={values.descuento}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="es_nuevo"
                                            name="es_nuevo"
                                            checked={values.es_nuevo}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="¿Es nuevo?"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="habilitado"
                                            name="habilitado"
                                            checked={values.habilitado}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="¿Habilitado?"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Ancho"
                                    id="ancho"
                                    name="ancho"
                                    type="number"
                                    value={values.ancho}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Alto"
                                    id="alto"
                                    name="alto"
                                    type="number"
                                    value={values.alto}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Profundidad"
                                    id="profundidad"
                                    name="profundidad"
                                    type="number"
                                    value={values.profundidad}
                                    onChange={handleChange}
                                    margin="normal"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="es_nuevo"
                                            name="es_nuevo"
                                            checked={values.es_nuevo}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="¿Es nuevo?"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="habilitado"
                                            name="habilitado"
                                            checked={values.habilitado}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="¿Habilitado?"
                                />
                            </Grid>
                        </Grid>


                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <MenuItem value="">Seleccione colores</MenuItem>
                                <FormGroup row>
                                    {colors.map((color) => (
                                        <FormControlLabel
                                            key={color.id}
                                            control={
                                                <>
                                                    <Checkbox
                                                        //checked={selectedColors.includes(color.id)}
                                                        onChange={() => handleColorChange(color.id)}
                                                    />
                                                    <TextField
                                                        disabled
                                                        type="color"
                                                        value={color.codigo_hex}
                                                        sx={{ width: 50 }}
                                                        style={{ padding: "0px !important" }}
                                                    /></>
                                            }
                                        />

                                    ))}
                                </FormGroup>
                            </FormControl>
                        </Grid>

                        <Typography variant="h6" mt={2} mb={1}>
                            URLs de Imágenes del Producto
                        </Typography>

                        {imageUrls.map((url, index) => (
                            <Box key={index} display="flex" alignItems="center" mb={2}>
                                <TextField
                                    label={`URL de imagen ${index + 1}`}
                                    value={url}
                                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                    fullWidth
                                />
                                {url && (
                                    <Box ml={2}>
                                        <img src={url} alt={`Previsualización ${index + 1}`} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
                                    </Box>
                                )}
                            </Box>
                        ))}

                        <IconButton onClick={addImageUrlField} color="primary">
                            <AddIcon />
                            <Typography variant="body2" ml={1}>
                                Añadir otra URL de imagen
                            </Typography>
                        </IconButton>



                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Crear Producto
                        </Button>
                    </Box>
                </Modal>
            </>
        )
    }
}