import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

function PagosPendientesCard({ pago }) {
  const navigate = useNavigate();

  if (!pago) {
    return <p>No hay datos disponibles</p>; // Mensaje en caso de que no haya datos
  }

  const handleEdit = () => {
    navigate(`/EditPago/${pago.id}`);
  };

  return (
    <div className="relative bg-[#F2EAEA]  flex flex-col justify-center items-center p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Pago ID: {pago.id || 'N/A'}</h2>
      <Text className="mb-1"><strong>Nombre:</strong> {pago.alumno_nombre || 'N/A'}</Text>
      <Text className="mb-1"><strong>Concepto:</strong> {pago.concepto || 'N/A'}</Text>
      <Text className="mb-1"><strong>Cantidad:</strong> {pago.cantidad || 'N/A'}</Text>
      <Text className="mb-1"><strong>Anticipo:</strong> {pago.anticipo || 'N/A'}</Text>
      <Text className="mb-1"><strong>Fecha de Creación:</strong> {new Date(pago.fecha_creacion).toLocaleDateString() || 'N/A'}</Text>
      <Text className="mb-1"><strong>Fecha de Actualización:</strong> {new Date(pago.updated_at).toLocaleDateString() || 'N/A'}</Text>
      <div className='flex justify-end p-4'>
        <Button onClick={() => navigate("/Pagos")}>Ir</Button>
      </div>
    </div>
  );
}

export default PagosPendientesCard;
