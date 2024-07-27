import React from 'react';

function Image({ src, alt }) {
  const handleError = (event) => {
    event.target.src = '/public/Images/LogoJC.png'; // Ruta a una imagen de placeholder
  };

  return (
    <img
      src={src}
      alt={alt}
      className="w-28 h-auto object-cover"
      onError={handleError}
    />
  );
}

export default Image;
