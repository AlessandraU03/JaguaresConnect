// src/components/organisms/SectionEquipos.js
import React, { useState, useEffect } from 'react';
import EquipoCard from '../molecules/EquipoCardAlumno';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SectionEquiposA() {
  const [equipos, setEquipos] = useState([]);
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [filteredEquipos, setFilteredEquipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        setEquipos(data);
        setFilteredEquipos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'No se pudieron cargar los equipos.', 'error');
      }
    };

    fetchEquipos();

    fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos-img', {
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
  }, []);

  const handleViewClick = (equipoId) => {
    navigate(`/equipo/${equipoId}`);
  };

  const getImageUrl = (equipoId) => {
    const image = images.find(img => img.equipo_id === equipoId);
    if (!image) {
      console.log(`No image found for equipo ${equipoId}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for equipo ${equipoId}: ${url}`);
    return url;
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEquipos.map(equipo => (
        <EquipoCard 
          key={equipo.id} 
          equipo={equipo} 
          onViewClick={handleViewClick}
          imageUrl={getImageUrl(equipo.id)}
        />
      ))}
    </div>
  );
}

export default SectionEquiposA;
