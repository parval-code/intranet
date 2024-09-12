import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  images: string[];
}

const Preloader: React.FC<PreloaderProps> = ({ images }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setLoaded(true);
    });
  }, [images]);

  return (
    <div>
      {!loaded && <div>Preloading...</div>}
      {loaded && <div>Images are loaded!</div>}
      {/* Puedes agregar aquí cualquier contenido adicional */}
    </div>
  );
};

export default Preloader;
