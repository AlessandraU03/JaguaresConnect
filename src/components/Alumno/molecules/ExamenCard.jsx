import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { Link } from 'react-router-dom';

function ExamenCardAlumno({ examen }) {

  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md">
      <Image alt={examen.nombrealumno} />
      <h2 className="mt-2 text-lg font-semibold">{examen.nombrealumno}</h2>
      <Text className="text-gray-500">EXAMEN N°{examen.id}</Text>
      <div className="flex mt-4 space-x-2">
      <Link to={`/examen/${examen.id}`}
               className="bg-[#7FB16E] text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="view">

                Ver
              </Link>
      </div>
    </div>
  );
}

export default ExamenCardAlumno;
