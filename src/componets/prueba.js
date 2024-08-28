import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const LandingPage = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .landing-page {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradientBG 15s ease infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="landing-page" style={{ 
      color: '#ffffff', 
      minHeight: '100vh',
      overflowY: 'auto',
      scrollSnapType: 'y mandatory'
    }}>
      <section style={{ 
        height: '100vh', 
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          style={{
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2rem'
          }}
        >
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M60 10L110 95H10L60 10Z"
              stroke="#ffffff"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            />
          </motion.svg>
        </motion.div>
        <Container>
          <h1 className="text-center mb-4">Bienvenidos a Nuestra Tienda</h1>
          <p className="text-center">Descubre productos únicos y de alta calidad</p>
        </Container>
      </section>

      <section style={{ 
        minHeight: '100vh', 
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Container>
          <h2 className="text-center mb-4">Quiénes Somos</h2>
          <p>Somos una empresa dedicada a ofrecer productos innovadores y de alta calidad. Nuestra pasión es satisfacer las necesidades de nuestros clientes con un servicio excepcional y productos que marcan la diferencia.</p>
        </Container>
      </section>

      <section style={{ 
        minHeight: '100vh', 
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Container>
          <h2 className="text-center mb-4">Nuestros Productos</h2>
          <Row>
            {[1, 2, 3].map((product) => (
              <Col key={product} md={4} className="mb-4">
                <Card bg="dark" text="white">
                  <Card.Img variant="top" src={`https://picsum.photos/300/200?random=${product}`} />
                  <Card.Body>
                    <Card.Title>Producto {product}</Card.Title>
                    <Card.Text>
                      Descripción breve del producto {product}. Características únicas y beneficios para el cliente.
                    </Card.Text>
                    <Button variant="primary">Ver más</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section style={{ 
        minHeight: '100vh', 
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Container>
          <h2 className="text-center mb-4">Contáctanos</h2>
          <p className="text-center">Estamos aquí para ayudarte. Contáctanos a través de:</p>
          <div className="d-flex justify-content-center">
            <Button variant="info" href="https://t.me/tuusuario" target="_blank" className="me-3">
              Telegram
            </Button>
            <Button variant="success" href="https://es.wallapop.com/user/tuusuario" target="_blank">
              Wallapop
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;