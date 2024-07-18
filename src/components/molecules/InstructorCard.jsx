import React from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function InstructorCard({ instructor, onDeleteClick, onViewClick }) {
  
  const navigate = useNavigate();
  const handleViewClick = () => {
    onViewClick(instructor.id);
  };


  const confirmDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al alumno ${instructor.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(instructor.id);
        Swal.fire(
          '¡Eliminado!',
          `El alumno ${instructor.nombre} ha sido eliminado.`,
          'success'
        );
      }
    });
  };
  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md">
      <Image alt={instructor.nombre} />
      <h2 className="mt-2 text-lg font-semibold">{instructor.nombre} {instructor.apellido}</h2>
      <Text className="text-gray-500">{instructor.telefono}</Text>
      <Text className="text-gray-500">{instructor.correo}</Text>
      <div className="flex mt-4 space-x-2">
        <Button onClick={handleViewClick} type="view">Ver</Button>
        <Button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="delete">Eliminar</Button>
      </div>
    </div>
  );
}

export default InstructorCard;