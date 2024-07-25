import React, { useState, useEffect } from 'react';
import EquiposCard from '../molecules/EquiposCard';
import Swal from 'sweetalert2';
import EquipoLogic from '../molecules/EquipoLogic';

function SectionEquipos({ view, setView, searchTerm }) {
  const [equipo, setEquipo] = useState([]);
  const [selectedEquipoId, setSelectedEquipoId] = useState(null);
  const [filteredEquipos, setFilteredEquipos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Token no encontrado');
        }

        console.log('Token en sessionStorage:', token); 
        const cleanedToken = token.startsWith('Bearer ') ? token.substring(7) : token;

        const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${cleanedToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const data = await response.json();
        setEquipo(data);
        setFilteredEquipos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = equipo.filter(equipo =>
      equipo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipo.id.toString().includes(searchTerm)
    );
    setFilteredEquipos(results);
  }, [searchTerm, equipo]);

  const handleViewClick = (equipoId) => {
    setSelectedEquipoId(equipoId);
    setView('detail');
  };

  const handleEditClick = (equipoId) => {
    setSelectedEquipoId(equipoId);
    setView('edit');
  };

  const handleDeleteClick = async (equipoId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      const cleanedToken = token.startsWith('Bearer ') ? token.substring(7) : token;

      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${equipoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${cleanedToken}`, // Usa el token limpio en el encabezado
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete equipo: ${errorText}`);
      }

      const updatedEquipos = equipo.filter(equipo => equipo.id !== equipoId);
      setEquipo(updatedEquipos);
      setFilteredEquipos(updatedEquipos);
      Swal.fire(
        'Eliminado',
        'El equipo ha sido eliminado correctamente.',
        'success'
      );
    } catch (error) {
      console.error('Error deleting equipo:', error);
      Swal.fire(
        'Error',
        'No se pudo eliminar el equipo. Inténtalo de nuevo más tarde.',
        'error'
      );
    }
  };

  return (
    <>
      {view === 'list' && (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredEquipos.map(equipo => (
              <EquiposCard
                key={equipo.id}
                equipo={equipo}
                onViewClick={handleViewClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        </div>
      )}
      {(view === 'detail' || view === 'edit') && (
        <EquipoLogic 
          id={selectedEquipoId} 
          isEditing={view === 'edit'} 
          onBackClick={() => setView('list')}
        />
      )}
    </>
  );
}

export default SectionEquipos;
