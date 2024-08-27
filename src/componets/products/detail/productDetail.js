import React from 'react';
import { useParams } from 'react-router-dom';
import { GetProductById } from '../../../services/product';
import { Loader } from '../../loader/loader';
import OutOfService from '../../error/outOfService/outOfService';
import { Reviews, DetailProduct } from '../../accordion/accordion';
import Gallery from '../../gallery/gallery';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import './productDetail.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, error, isLoading } = GetProductById(productId);

  if (isLoading) return <Loader />
  if (error) return <OutOfService />

  const { producto_nombre: nombre,
    producto_id,
    descripcion,
    descuento,
    imagenes_urls: images,
    precio,
    reseñas,
    colores: colors,
    ancho,
    alto,
    profundidad,
    link_wallapop } = product[0];

  return (
    <div className="product-detail">
      <Breadcrumb currentProduct={nombre} />
      <Gallery images={images} />
      <DetailProduct options={{ producto_id, nombre, descripcion, descuento, precio, colors, ancho, alto, profundidad, link_wallapop }} />
      {reseñas.length > 0 && <Reviews reviews={reseñas} />}
    </div>
  );
};

export default ProductDetail;
