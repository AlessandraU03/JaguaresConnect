import React from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function ExamenCard({ examen, imageUrl, onDeleteClick }) {

  const confirmDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el examen de ${examen.nombrealumno}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(examen.id);
        Swal.fire(
          '¡Eliminado!',
          `El examen ${examen.nombrealumno} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  
  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md">
     <Image src={imageUrl} alt={`${examen.nombrealumno} ${examen.apellidoalumno}`} />
      <h2 className="mt-2 text-lg font-semibold">{examen.nombrealumno}</h2>
      <Text className="text-gray-500">EXAMEN N°{examen.id}</Text>
      <div className="flex mt-4 space-x-2">
      <Link to={`/examen/${examen.id}/view`}
               className="bg-[#7FB16E] text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="view">

                Ver
              </Link>
       
        <Button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="delete">Eliminar</Button>
        <Link to={`/examen/${examen.id}/edit`}  className="bg-[#5E4BD1] text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" >Modificar </Link>
      </div>
    </div>
  );
}

export default ExamenCard;
