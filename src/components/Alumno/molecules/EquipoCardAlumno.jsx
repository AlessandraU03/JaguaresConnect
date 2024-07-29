import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

function EquipoCardAlumno({ equipo, imageUrl }) {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

    return (
      <div className="relative flex flex-col items-center p-4 border rounded-md shadow-md">
            {!imageError ? (
        imageUrl ? (
          <Image src={imageUrl} alt={`${equipo.nombre}`} onError={handleImageError} />
        ) : (
          <p>No image available</p>
        )
      ) : (
        <p>Image failed to load</p>
      )}
        <h2 className="mt-2 text-lg font-semibold">{equipo.nombre}</h2>
        <Text className="text-gray-500">Talla: {equipo.talla}</Text>
        <Text className="text-gray-500">Precio: ${equipo.precio}</Text>
        <Text className="text-gray-500">Descripción: {equipo.descripcion}</Text>
        <Text className="text-gray-500">Composición: {equipo.composicion}</Text>
        <Text className="text-gray-500">Color: {equipo.color}</Text>
        
        <div className="flex mt-4 space-x-2">
          <Link to={`/equipo/${equipo.id}`} className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="view">
          Ver
          </Link>
        </div>
      </div>
    );
  }  

export default EquipoCardAlumno;
