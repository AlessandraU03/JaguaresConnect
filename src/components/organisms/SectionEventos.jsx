import React, { useState, useEffect } from 'react';
import EventosCard from '../molecules/EventosCard';
import Swal from 'sweetalert2';

function Sectioneventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos')
      .then(response => response.json())
      .then(data => setEventos(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (eventoId) => {
    window.location.href = `/eventos/${eventoId}`;
  };

  const handleDeleteClick = (eventoId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${eventoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setEventos(eventos.filter(evento => evento.id !== eventoId));
        } else {
          console.error('Failed to delete event');
          Swal.fire(
            'Error',
            'No se pudo eliminar el evento. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting event:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar el evento. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-2 gap-6">
      {eventos.map(evento => (
        <EventosCard
          key={evento.id} 
          evento={evento} 
          onViewClick={handleViewClick} 
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default Sectioneventos;
