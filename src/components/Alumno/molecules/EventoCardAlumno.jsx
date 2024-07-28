import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

function EventoCardAlumno({ evento, imageUrl }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
 
  if (!evento) {
    return null; // Manejar el caso en el que evento es undefined
  }

  return (
    <div className="relative bg-[#F2EAEA]  flex flex-col items-center p-6 border rounded-md shadow-md">
      <div className="flex-shrink-0">
        {!imageError ? (
          imageUrl ? (
            <Image src={imageUrl} alt={`${evento.nombre}`} onError={handleImageError} />
          ) : (
            <p>No image available</p>
          )
        ) : (
          <p>Image failed to load</p>
        )}
      </div>
      <h2 className="mt-2 text-lg font-semibold">Nombre: {evento.nombre}</h2>
      <Text className="text-gray-500">Fecha: {new Date(evento.fecha).toLocaleDateString()}</Text>
      <Text className="text-gray-500">Lugar: {evento.lugar}</Text>
      <Text className="text-gray-500">Hora: {evento.hora}</Text>
      <Text className="text-gray-500">Categorias: {evento.categorias}</Text>
      <Text className="text-gray-500">Costo: ${evento.costo}</Text>
      <div className="flex mt-4 space-x-2">
      <Link to={`/evento/${evento.id}`}
               className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="view">
                Ver
              </Link>
      </div>
    </div>
  );
}

export default EventoCardAlumno;