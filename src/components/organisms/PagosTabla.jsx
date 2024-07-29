import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Tabla from '../atoms/Tabla';
import Button from '../atoms/Button';

function PagosTabla({ searchTerm }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tipoPago, setTipoPago] = useState('realizados');
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const navigate = useNavigate()
  
  useEffect(() => {
    const tipo = new URLSearchParams(window.location.search).get('tipo');
    setTipoPago(tipo === 'pendientes' ? 'pendientes' : 'realizados');
  }, []);

  useEffect(() => {
    fetchData();
  }, [tipoPago]);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = data.filter(pago =>
        (pago.id && pago.id.toString().includes(lowerCaseSearchTerm)) || 
        (pago.alumno_nombre && pago.alumno_nombre.toLowerCase().includes(lowerCaseSearchTerm))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  const fetchData = () => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/pagos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(pago =>
          tipoPago === 'realizados' ? pago.realizado === 1 : pago.realizado === 0
        );
        setData(filteredData);
        setFilteredData(filteredData); // Inicialmente, mostrar todos los datos filtrados
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const headers = ['ID', 'Nombre', 'Concepto', 'Cantidad', 'Anticipo', 'Fecha de Creación', 'Fecha de Actualización', 'Acciones'];

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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
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
        })
        .catch(error => {
          console.error('Error deleting data:', error);
        });
      }
    });
  };

  const dataForTable = filteredData.map(pago => ([
    pago.id || 'N/A',
    pago.alumno_nombre || 'N/A',
    pago.concepto || 'N/A',
    pago.cantidad || 'N/A',
    pago.anticipo || 'N/A',
    new Date(pago.fecha_creacion).toLocaleDateString(),
    new Date(pago.updated_at).toLocaleDateString(),
    <div key={pago.id} className="flex justify-center space-x-2">
      {tipoPago === 'pendientes' && (
        <button
          onClick={() => handleEdit(pago.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
      <button
        onClick={() => handleDelete(pago.id)}
        className="text-red-500 hover:text-red-700"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  ]));

  const handleEdit = (id) => {
    navigate(`/EditPago/${id}`);
  };

  const handleClick = () => {
    navigate("/Pagos");
  };

  return (
    <>
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-semibold mb-4">{`Pagos ${tipoPago.charAt(0).toUpperCase() + tipoPago.slice(1)}`}</h1>
        <Tabla headers={headers} data={dataForTable} />
      </div>
      <div className='flex justify-end p-10'>
        <Button onClick={handleClick}>Salir</Button>
      </div>
    </>
  );
}

export default PagosTabla;