import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Printer3DAnimation = () => (
  <motion.svg
    width="300"
    height="300"
    viewBox="0 0 200 200"
    initial="hidden"
    animate="visible"
  >
    {/* Printer base */}
    <motion.rect
      x="40"
      y="140"
      width="120"
      height="20"
      fill="#e0e0e0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    
    {/* Printer frame */}
    <motion.path
      d="M60 140 L60 60 L140 60 L140 140"
      stroke="#b0b0b0"
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    />
    
    {/* Print head */}
    <motion.rect
      x="90"
      y="70"
      width="20"
      height="10"
      fill="#4a90e2"
      initial={{ y: 70 }}
      animate={{ y: [70, 120, 70] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 1.5 }}
    />
    
    {/* Printing object */}
    <motion.path
      d="M80 140 L80 130 L120 130 L120 140"
      stroke="#50c878"
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 1.5 }}
    />
  </motion.svg>
);

export default function LightMinimalistLandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yPresentacion = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacityPresentacion = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const yProductos = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
  const opacityProductos = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const yDefinicion = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const opacityDefinicion = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const yContacto = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);
  const opacityContacto = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  return (
    <div ref={ref} className="min-vh-100" style={{ background: '#f8f9fa' }}>
      {/* Sección de Presentación */}
      <motion.section 
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{ y: yPresentacion, opacity: opacityPresentacion }}
      >
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4 text-primary">3D Print Pro</h1>
          <Printer3DAnimation />
          <p className="lead mb-3 text-dark">Transformando ideas en realidad, capa por capa</p>
          <p className="mb-4 text-muted">
            En 3D Print Pro, nos especializamos en llevar tus conceptos más audaces a la vida tangible. 
            Nuestra tecnología de vanguardia y nuestro equipo de expertos están listos para convertir 
            tus diseños digitales en objetos físicos de alta calidad. Ya sea que necesites un prototipo 
            rápido, una pieza personalizada o una producción en serie, estamos aquí para hacer realidad tu visión.
          </p>
          <motion.button 
            className="btn btn-outline-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubre Nuestros Servicios
          </motion.button>
        </div>
      </motion.section>

      {/* Sección de Productos */}
      <motion.section 
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4"
        style={{ y: yProductos, opacity: opacityProductos }}
      >
        <h2 className="display-5 fw-bold mb-5 text-primary">Nuestros Productos Destacados</h2>
        <div className="container">
          <div className="row g-4">
            {[
              { name: "Prototipo Rápido", image: "https://via.placeholder.com/300x300.png?text=Prototipo+3D" },
              { name: "Figura Personalizada", image: "https://via.placeholder.com/300x300.png?text=Figura+3D" },
              { name: "Pieza Mecánica", image: "https://via.placeholder.com/300x300.png?text=Pieza+3D" }
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <motion.div 
                  className="card h-100 border-0 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h3 className="card-title h5 text-primary">{item.name}</h3>
                    <a href="/productos" className="btn btn-outline-primary mt-2">Ver detalles</a>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <motion.a 
              href="/productos" 
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver todos los productos
            </motion.a>
          </div>
        </div>
      </motion.section>

{/* Sección "Lo que nos define" */}
<motion.section 
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4"
        style={{ y: yDefinicion, opacity: opacityDefinicion }}
      >
        <h2 className="display-5 fw-bold mb-5 text-primary">Lo que nos define</h2>
        <div className="container">
          <div className="row g-4">
            {[
              { title: "Innovación", description: "Estamos a la vanguardia de la tecnología de impresión 3D, siempre buscando nuevas formas de mejorar nuestros procesos y productos." },
              { title: "Calidad", description: "Nos comprometemos a ofrecer la más alta calidad en cada pieza que producimos, garantizando la satisfacción de nuestros clientes." },
              { title: "Personalización", description: "Cada proyecto es único, y nos especializamos en crear soluciones personalizadas que se adaptan perfectamente a las necesidades de nuestros clientes." },
              { title: "Sostenibilidad", description: "Nos esforzamos por minimizar nuestro impacto ambiental utilizando materiales ecológicos y optimizando nuestros procesos de producción." }
            ].map((item, index) => (
              <div key={index} className="col-md-6">
                <div className="card bg-dark text-light h-100">
                  <div className="card-body">
                    <h3 className="card-title h5 text-primary">{item.title}</h3>
                    <p className="card-text text-muted">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Nueva Sección de Contacto */}
      <motion.section 
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4"
        style={{ y: yContacto, opacity: opacityContacto }}
      >
        <h2 className="display-5 fw-bold mb-5 text-primary">Contáctanos</h2>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <p className="mb-4">¿Tienes alguna pregunta o proyecto en mente? ¡Contáctanos a través de estos canales!</p>
              <div className="d-flex justify-content-center gap-4">
                <motion.a 
                  href="https://t.me/your_telegram_username" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Telegram
                </motion.a>
                <motion.a 
                  href="https://es.wallapop.com/user/your_wallapop_username" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-success btn-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Wallapop
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}