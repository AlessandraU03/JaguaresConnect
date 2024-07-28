import React, { useState } from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function PedidosCard({ pedido, onDeleteClick, onViewClick, imageUrl }) {
  const [imageError, setImageError] = useState(false);

  const navigate = useNavigate();
  const handleViewClick = () => {
    if (pedido) {
      onViewClick(pedido.pedido_id);
    }
  };

  const confirmDelete = () => {
    if (pedido) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar al alumno ${pedido.nombre_alumno || ''}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          onDeleteClick(pedido.pedido_id);
          Swal.fire(
            '¡Eliminado!',
            `El alumno ${pedido.nombre_alumno || ''} ha sido eliminado.`,
            'success'
          );
        }
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  
  if (!pedido) {
    return <div>Error: Pedido no encontrado.</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 border rounded-md shadow-md">
                  {!imageError ? (
        imageUrl ? (
          <Image src={imageUrl} alt={`${pedido.nombre_alumno}}`} onError={handleImageError} />
        ) : (
          <p>No image available</p>
        )
      ) : (
        <p>Image failed to load</p>
      )}
      <h2 className="mt-2 text-lg font-semibold">{pedido.nombre_alumno} {pedido.apellido} {pedido.pedido_id}</h2>
      <Text className="text-gray-500">Realizó un pedido</Text>
      <div className="flex mt-4 space-x-2">
        <Button onClick={handleViewClick} type="view">Ver</Button>
        <Button onClick={confirmDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors md:py-3 md:px-6" type="delete">Eliminar</Button>
      </div>
    </div>
  );
}

export default PedidosCard;
