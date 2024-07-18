import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Tabla from '../atoms/Tabla';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

function PagosTabla() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [tipoPago, setTipoPago] = useState('realizados');
  const navigate = useNavigate();

  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get('tipo');
    setTipoPago(tipo === 'pendientes' ? 'pendientes' : 'realizados');
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [tipoPago]);

  const handleClick = () => {
    navigate("/Pagos");
  };


  const fetchData = () => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/pagos')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(pago => 
          tipoPago === 'realizados' ? pago.realizado === 1 : pago.realizado === 0
        ).map(pago => [
          pago.id,
          pago.alumno_nombre,
          pago.concepto,
          pago.cantidad,
          pago.anticipo,
          new Date(pago.fecha_creacion).toLocaleDateString(),
          new Date(pago.updated_at).toLocaleDateString(),
          
          <div key={pago.id} className="flex justify-center space-x-2">
            <button onClick={() => handleEdit(pago.id)} className="text-blue-500 hover:text-blue-700">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => handleDelete(pago.id)} className="text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        ]);
        setData(filteredData);
      });
  };

  const headers = ['ID', 'Nombre', 'Concepto', 'Cantidad', 'Anticipo', 'Fecha de Creación', 'Fecha de Actualización', 'Acciones'];

  const handleEdit = (id) => {
    console.log(`Editar pago con ID: ${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/pagos/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (response.ok) {
            Swal.fire(
              'Eliminado!',
              'El pago ha sido eliminado.',
              'success'
            );
            fetchData();
          } else {
            Swal.fire(
              'Error!',
              'Hubo un problema al eliminar el pago.',
              'error'
            );
          }
        });
      }
    });
  };

  return (
    <>
    <div className="container mx-auto p-10">
      <h1 className="text-2xl font-semibold mb-4">{`Pagos ${tipoPago.charAt(0).toUpperCase() + tipoPago.slice(1)}`}</h1>
      <Tabla headers={headers} data={data} />
    </div>
    <div className='flex justify-end p-10 '>
    <Button onClick={handleClick}>Salir</Button>
    </div>
    </>
  );
}

export default PagosTabla;
