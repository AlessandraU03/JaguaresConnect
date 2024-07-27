// src/components/organisms/SectionEquipos.js
import React, { useState, useEffect } from 'react';
import EquipoCard from '../molecules/EquipoCardAlumno';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SectionEquiposA() {
  const [equipos, setEquipos] = useState([]);
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
  }, []);

  const handleViewClick = (equipoId) => {
    navigate(`/equipo/${equipoId}`);
  };
;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEquipos.map(equipo => (
        <EquipoCard 
          key={equipo.id} 
          equipo={equipo} 
          onViewClick={handleViewClick}
        />
      ))}
    </div>
  );
}

export default SectionEquiposA;
