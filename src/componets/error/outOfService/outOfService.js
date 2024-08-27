import React from 'react';
import ImagenOut from '../../../imagenes/outofservice.svg'
const OutOfService = () => {
    return (
      <div style={styles.container}>
        <img
          src={ImagenOut}
          alt="Triste"
          style={styles.image}
        />
        <h1 style={styles.heading}>Temporalmente Fuera de Servicio</h1>
        <p style={styles.paragraph}>Actualmente no podemos procesar su solicitud.</p>
        <p style={styles.paragraph}>Estamos trabajando para resolver este problema. Por favor, intente nuevamente más tarde.</p>
      </div>
    );
  }
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa', // Fondo claro
      padding: '20px',
    },
    image: {
      width: '150px', // Tamaño de la imagen
      marginBottom: '20px',
    },
    heading: {
      fontSize: '2.5rem',
      margin: '0 0 20px 0',
    },
    paragraph: {
      fontSize: '1.25rem',
      margin: '0 0 10px 0',
    },
  };
  
  export default OutOfService;