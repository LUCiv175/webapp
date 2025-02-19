import React, { useState , useEffect} from 'react';
import '../styles/Slider.css';

const Slider = () => {
  const images = [
    'https://www.paolovi.it/_next/image?url=https%3A%2F%2Fcms.oltrebrescia.it%2Fuploads%2Fitinerario_storico_artistico_brescia_piazza_loggia_paolo_vi_14b0db2106.webp&w=3840&q=75',
    'https://www.gardavisit.it/wp-content/uploads/2022/07/luca-bravo-7U9BLceVAKM-unsplash.webp',
    'https://fai-platform.imgix.net/uploads/7e3c090c-9da8-44a2-b374-22f01538cb6a.jpg',
    'https://www.bresciamusei.com/wp-content/uploads/2023/08/5.-Brixia.-Parco-Archeologico-di-Brescia-Romana-il-Capitolium-%C2%A9Archivio-Fotografico-Civici-Musei-di-Brescia-%E2%80%93-Photo-Tomas-Quiroga.jpg'
  ];

  const duplicatedImages = [images[images.length - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1); // Inizia dall'indice 1 (prima immagine reale)
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Gestisce il reset dell'indice senza animazione
  useEffect(() => {
    if (currentIndex === duplicatedImages.length - 1) {
      // Se siamo alla fine, passa alla seconda immagine (senza animazione)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500); // Tempo corrispondente alla durata della transizione
    } else if (currentIndex === 0) {
      // Se siamo all'inizio, passa alla penultima immagine (senza animazione)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(duplicatedImages.length - 2);
      }, 500); // Tempo corrispondente alla durata della transizione
    }
  }, [currentIndex, duplicatedImages.length]);

  return (
    <div className="slider-container" style={{ position: 'relative' , width: '100%' }}>
      <button className="slider-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider-wrapper">
        <div
          className="slider-content"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none', // Disabilita la transizione durante il reset
          }}
        >
          {duplicatedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          ))}
        </div>
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slider;