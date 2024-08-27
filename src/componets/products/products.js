import React, { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    TextField,
    Chip,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useSWR from "swr"

import { Search, Info } from '@mui/icons-material';
import { GetCategories } from '../../services/categories';

import { Loader } from '../loader/loader';
import OutOfService from '../error/outOfService/outOfService';
import { Link as LinkReactRouter } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export default function Products() {
    const fetcher = (url) => fetch(url).then(res => res.json());

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const { data, error, isLoading } = useSWR('http://localhost:3977/products', fetcher, {
        onSuccess: (data) => {
            setFilteredProducts(data);
        },
    });

    const { data: dataOfCategories, errorCategories, isLoadingCategories } = GetCategories();
    if (isLoading || isLoadingCategories) return <Loader />
    if (error || errorCategories) return <OutOfService />

    const categories = dataOfCategories != null && dataOfCategories != undefined && dataOfCategories.length > 0 ? dataOfCategories : [];
    return displayProduct(data, categories);


    function displayProduct(products, categories) {
        const searchByCategory = (e) => {
            var selectedCategory = e.target.value;
            console.log(selectedCategory);
            setCategory(selectedCategory);
            setFilteredProducts(+selectedCategory === 4 ? products : products.filter(p => +p.categoria_id === +selectedCategory));
        }
        const searchByName = (e) => {
            var selectedNameToFind = e.target.value;
            setSearchTerm(selectedNameToFind);
            setFilteredProducts(products.filter(p => p.producto_nombre.toLowerCase().includes(selectedNameToFind.toLowerCase())));
        }
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>

                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    
                                }}
                                gap={2}>
                                    <TextField
                                        size='medium'
                                        variant="outlined"
                                        placeholder="Buscar productos..."
                                        value={searchTerm}
                                        onChange={searchByName}
                                        InputProps={{
                                            startAdornment: <Search />,
                                        }}
                                    />

                                    <FormControl fullWidth>
                                        <InputLabel>Categoría</InputLabel>
                                        <Select
                                            id="categoryToSearch"
                                            name="categoryToSearch"
                                            value={category}
                                            onChange={searchByCategory}
                                        >
                                            <MenuItem value="">Selecciona una categoría</MenuItem>
                                            {categories.map(category => {
                                                return <MenuItem key={category.id} value={category.id}>{category.nombre}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </AccordionDetails>
                        </Accordion>


                        <Grid container spacing={4}>
                            {filteredProducts.map((product) => (

                                <Grid item key={product.producto_id} xs={12} sm={6} md={4}>
                                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    height: 200,
                                                    objectFit: 'contain',
                                                }}
                                                image={product.imagenes_urls[0]}
                                                alt={product.producto_nombre}
                                            />
                                            {product.descuento && product.descuento > 0 && (
                                                <Chip
                                                    label={`${product.descuento}% OFF`}
                                                    color="secondary"
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {product.producto_nombre}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                                                {product.descuento && product.descuento > 0 ? (
                                                    <>
                                                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 1 }}>
                                                            ${parseFloat(product.precio).toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body1" color="secondary">
                                                            ${parseFloat(parseFloat(product.precio) * (1 - product.descuento / 100)).toFixed(2)}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant="body1" color="text.secondary">
                                                        ${parseFloat(product.precio).toFixed(2)}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <LinkReactRouter to={`/product/${product.producto_id}`}>
                                                <Button size="small" startIcon={<Info />}>
                                                    Más información
                                                </Button>
                                            </LinkReactRouter>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid >

                    </Container>
                </Box>
            </ThemeProvider >
        );

    }

}