import React, { useState, useEffect } from 'react';
import EquiposCard from '../molecules/EquiposCard';
import Swal from 'sweetalert2';
import EquipoLogic from '../molecules/EquipoLogic';

function SectionEquipos({ view, setView, searchTerm }) {
  const [equipo, setEquipo] = useState([]);
  const [selectedEquipoId, setSelectedEquipoId] = useState(null);
  const [filteredEquipos, setFilteredEquipos] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos')
      .then(response => response.json())
      .then(data => {
        setEquipo(data);
        setFilteredEquipos(data);
      })
      .catch(error => console.error('Error fetching data:', error));
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

  const handleDeleteClick = (equipoId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${equipoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedEquipos = equipo.filter(equipo => equipo.id !== equipoId);
          setEquipo(updatedEquipos);
          setFilteredEquipos(updatedEquipos);
        } else {
          console.error('Failed to delete student');
          Swal.fire(
            'Error',
            'No se pudo eliminar al equipo. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting equipo:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar al equipo. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
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
