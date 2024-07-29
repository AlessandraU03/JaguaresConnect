import React, { useState, useEffect } from 'react';
import EventosCard from '../molecules/EventosCard';
import Swal from 'sweetalert2';

function Sectioneventos({searchTerm}) {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [images, setImages] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error('Token no encontrado');
        }
        console.log('Token en sessionStorage:', token); 
        const response = await fetch(`${import.meta.env.VITE_URL}/eventos`, {
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

    fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos-img', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        Swal.fire(
          'Error',
          'No se pudieron cargar las imágenes. Inténtalo de nuevo más tarde.',
          'error'
        );
      });

  }, [token]);

  const handleViewClick = (eventoId) => {
    window.location.href = `/eventos/${eventoId}`;
  };

  const handleDeleteClick = async (eventoId) => {
    try {
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

  useEffect(() => {
    const results = eventos.filter(evento =>
     evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     evento.id.toString().includes(searchTerm)
    );
    setFilteredEventos(results);
  }, [searchTerm, eventos]);


  const getImageUrl = (eventoId) => {
    const image = images.find(img => img.event_id === eventoId);
    if (!image) {
      console.log(`No image found for alumno ${eventoId}`);
      return '/default-image.png'; // Default image if no image is found
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${eventoId}: ${url}`);
    return url;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-2 gap-6">
      {filteredEventos.map(evento => (
        <EventosCard
          key={evento.id} 
          evento={evento} 
          imageUrl={getImageUrl(evento.id)}
          onViewClick={() => handleViewClick(evento.id)} 
          onDeleteClick={() => handleDeleteClick(evento.id)}
        />
      ))}
    </div>
  );
}

export default Sectioneventos;
