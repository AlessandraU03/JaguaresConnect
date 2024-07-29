import React, { useState, useEffect } from 'react';
import EquiposCard from '../molecules/EquiposCard';
import Swal from 'sweetalert2';
import EquipoLogic from '../molecules/EquipoLogic';

function SectionEquipos({ view, setView, searchTerm }) {
  const [equipo, setEquipo] = useState([]);
  const [selectedEquipoId, setSelectedEquipoId] = useState(null);
  const [filteredEquipos, setFilteredEquipos] = useState([]);
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (!token) {
          throw new Error('Token no encontrado');
        }

        console.log('Token en sessionStorage:', token); 
        
        const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos', {
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
        setEquipo(data);
        setFilteredEquipos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

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
     
      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${equipoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': token, 
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
    <>
      {view === 'list' && (
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredEquipos.map(equipo => (
              <EquiposCard
                key={equipo.id}
                equipo={equipo}
                imageUrl={getImageUrl(equipo.id)}
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
