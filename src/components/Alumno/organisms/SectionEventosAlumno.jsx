import React, { useState, useEffect } from 'react';
import EventoCard from '../molecules/EventoCardAlumno';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import EventoCardAlumno from '../molecules/EventoCardAlumno';

function SectionEventosA() {
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


  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 lg:grid-cols-2 gap-6">
      {eventos.map(evento => (
        <EventoCardAlumno
          key={evento.id} 
          evento={evento} 
        />
      ))}
    </div>
  );
}


export default SectionEventosA;