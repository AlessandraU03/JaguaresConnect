import React, { useState, useEffect } from 'react';
import EventoCard from '../molecules/EventoCardAlumno';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import EventoCardAlumno from '../molecules/EventoCardAlumno';

function SectionEventosA() {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');     
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

    fetch(`${import.meta.env.VITE_URL}/eventos-img`, {
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


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getImageUrl = (eventoId) => {
    const image = images.find(img => img.event_id === eventoId);
    if (!image) {
      console.log(`No image found for alumno ${eventoId}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${eventoId}: ${url}`);
    return url;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-2 gap-6">
      {eventos.map(evento => (
        <EventoCardAlumno
          key={evento.id} 
          evento={evento} 
          imageUrl={getImageUrl(evento.id)}
        />
      ))}
    </div>
  );
}


export default SectionEventosA;