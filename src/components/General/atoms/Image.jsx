import React from 'react';

function Image({ src, alt }) {
  const handleError = (event) => {
    event.target.src = '/public/Images/LogoJC.png'; // Ruta a una imagen de placeholder
  };

  return (
    <img
      src={src}
      alt={alt}
      className="w-[240px] h-[280px] object-contain"
      onError={handleError}
    />
  );
}

export default Image;
