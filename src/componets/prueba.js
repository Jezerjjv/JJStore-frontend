import React, { useState } from 'react';
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
    Link,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Search, Info } from '@mui/icons-material';
import { GetProducts } from '../services/product';
import { Loader } from './loader/loader';
import OutOfService from './error/outOfService/outOfService';
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

export default function Component() {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, error, isLoading } = GetProducts();

    if (isLoading) return <Loader />
    if (error) return <OutOfService />
    const products = data != null && data != undefined && data.length > 0 ? data : [];
    console.log(products);
    const filteredProducts = products.filter(product =>
        product.producto_nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Search />,
                        }}
                        sx={{ mb: 4 }}
                    />

                    <Grid container spacing={4}>
                        {filteredProducts.map((product) => (

                            <Grid item key={product.id} xs={12} sm={6} md={4}>
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
        </ThemeProvider>
    );
}