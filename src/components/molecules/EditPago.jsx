// src/components/EditPago.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../atoms/Button';

function EditPago() {
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [alumnoNombre, setAlumnoNombre] = useState('');
  const [concepto, setConcepto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [anticipo, setAnticipo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/pagos/${id}`)
      .then(response => response.json())
      .then(data => {
        setPago(data);
        setAlumnoNombre(data.alumno_nombre);
        setConcepto(data.concepto);
        setCantidad(data.cantidad);
        setAnticipo(data.anticipo);
      });
  }, [id]);

  const handleSave = () => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/pagos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alumno_nombre: alumnoNombre,
        concepto,
        cantidad,
        anticipo,
      }),
    })
    .then(response => {
      if (response.ok) {
        Swal.fire(
          'Actualizado!',
          'El pago ha sido actualizado.',
          'success'
        ).then(() => navigate('/Pagos'));
      } else {
        Swal.fire(
          'Error!',
          'Hubo un problema al actualizar el pago.',
          'error'
        );
      }
    });
  };

  if (!pago) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-4">Editar Pago</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nombre del Alumno</label>
        <input
          type="text"
          value={alumnoNombre}
          onChange={(e) => setAlumnoNombre(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Concepto</label>
        <input
          type="text"
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Anticipo</label>
        <input
          type="number"
          value={anticipo}
          onChange={(e) => setAnticipo(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
      <Button onClick={handleSave} className="bg-blue-500 text-white">Guardar</Button>
    </div>
  );
}

export default EditPago;
