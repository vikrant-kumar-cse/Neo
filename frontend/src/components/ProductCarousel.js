import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const ProductCarousel = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const productModels = [
    {
      title: 'Nike Air Max',
      description: 'A stylish and comfortable sneaker perfect for any occasion.',
      modelSrc: '/models/sneaker_model.glb',
    },
    {
      title: 'Classic Backpack',
      description: 'Durable and spacious backpack for everyday use.',
      modelSrc: '/models/backpack_model.glb',
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ 3D Product Carousel</h1>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        style={styles.swiper}
      >
        {productModels.map((product, index) => (
          <SwiperSlide key={index} style={styles.slide}>
            <model-viewer
              src={product.modelSrc}
              alt={product.title}
              auto-rotate
              camera-controls
              style={styles.modelViewer}
            ></model-viewer>
            <h3 style={styles.modelTitle}>{product.title}</h3>
            <p style={styles.modelDesc}>{product.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <button style={styles.button} onClick={() => setShowModal(true)}>▶️ Play Demo</button>

      {/* Demo Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ marginBottom: '10px' }}>🎮 Store Demo Experience</h2>
            <ul style={{ textAlign: 'left', marginBottom: '20px', lineHeight: '1.6' }}>
              <li>✅ <strong>Store Creation Benefits:</strong> Sell in 3D, immersive view.</li>
              <li>🎨 <strong>Look & Feel:</strong> Fully customizable layout & themes.</li>
              <li>🧠 <strong>Interactivity:</strong> Walkthrough, rotate, inspect products.</li>
              <li>🛠️ <strong>Editing:</strong> Add/edit items in just a few clicks!</li>
            </ul>
            <button style={styles.button} onClick={() => setShowModal(false)}>❌ Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  swiper: {
    width: '100%',
    paddingTop: '50px',
    paddingBottom: '50px',
  },
  slide: {
    backgroundColor: '#334155',
    borderRadius: '20px',
    padding: '20px',
    width: '300px',
    textAlign: 'center',
  },
  modelViewer: {
    width: '100%',
    height: '300px',
    backgroundColor: '#000',
    borderRadius: '12px',
    marginBottom: '20px',
  },
  modelTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  modelDesc: {
    fontSize: '0.95rem',
    color: '#e2e8f0',
  },
  button: {
    backgroundColor: '#0ea5e9',
    border: 'none',
    padding: '10px 20px',
    color: 'white',
    fontSize: '1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '30px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#1f2937',
    padding: '30px',
    borderRadius: '12px',
    width: '80%',
    maxWidth: '500px',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
  },
};

export default ProductCarousel;
