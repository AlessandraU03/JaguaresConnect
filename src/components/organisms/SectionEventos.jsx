import React, { useState, useEffect } from 'react';
import EventosCard from '../molecules/EventosCard';
import Swal from 'sweetalert2';

function Sectioneventos() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');     
        if (!token) {
          throw new Error('Token no encontrado');
        }
        console.log('Token en sessionStorage:', token); 
        const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token, 
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        setEventos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (eventoId) => {
    window.location.href = `/eventos/${eventoId}`;
  };

  const handleDeleteClick = async (eventoId) => {
    try {
      const token = sessionStorage.getItem('authToken');

      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${eventoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': token, 
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete event: ${errorText}`);
      }

      setEventos(eventos.filter(evento => evento.id !== eventoId));
      Swal.fire(
        'Eliminado',
        'El evento ha sido eliminado correctamente.',
        'success'
      );
    } catch (error) {
      console.error('Error deleting event:', error);
      Swal.fire(
        'Error',
        'No se pudo eliminar el evento. Inténtalo de nuevo más tarde.',
        'error'
      );
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-2 gap-6">
      {eventos.map(evento => (
        <EventosCard
          key={evento.id} 
          evento={evento} 
          onViewClick={() => handleViewClick(evento.id)} 
          onDeleteClick={() => handleDeleteClick(evento.id)}
        />
      ))}
    </div>
  );
}

export default Sectioneventos;
