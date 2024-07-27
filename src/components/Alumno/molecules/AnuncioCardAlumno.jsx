import React from 'react';
import Button from '../../atoms/Button';
import Text from "../atoms/Text";

function AnuncioCardAlumno({ anuncio, onViewClick }) {
  return (
    <div className="relative flex flex-col items-center p-4 border rounded-md shadow-md">
      <h2 className="mt-2 text-lg font-semibold">{anuncio.titulo}</h2>
      <Text className="text-gray-500">{anuncio.descripcion}</Text>
      <Text className="text-gray-500">{new Date(anuncio.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
      <div className="absolute bottom-2 right-2">
        <Button onClick={() => onViewClick(anuncio.id)}>Ver</Button>
      </div>
    </div>
  );
}

export default AnuncioCardAlumno;
