import React from 'react';
import Button from '../../atoms/Button';
import Text from '../atoms/Text';

function AnuncioCardAlumno({ anuncio, onViewClick }) {
  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md sm:flex-row sm:items-start sm:p-6 lg:flex-col lg:items-center lg:p-4">
      <div className="flex flex-col items-center sm:items-start sm:mr-4 lg:mr-0 lg:items-center">
        <h2 className="mt-2 text-lg font-semibold text-center sm:text-left lg:text-center">{anuncio.titulo}</h2>
        <Text className="text-gray-500 text-center sm:text-left lg:text-center">{anuncio.descripcion}</Text>
        <Text className="text-gray-500 text-center sm:text-left lg:text-center">{new Date(anuncio.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-auto lg:mt-4 lg:ml-0">
        <Button onClick={() => onViewClick(anuncio.id)}>Ver</Button>
      </div>
    </div>
  );
}

export default AnuncioCardAlumno;
