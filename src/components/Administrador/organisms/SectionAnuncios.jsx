import AnuncioCard from '../molecules/AnuncioCard';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function SectionAnuncios({ searchTerm }) {
  const [anuncios, setAnuncios] = useState([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        const response = await fetch(`${import.meta.env.VITE_URL}/anuncios`, {
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
        setAnuncios(data);
        setFilteredAnuncios(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAnuncios();
  }, []);

  useEffect(() => {
    let filtered = anuncios;
    const { query, fecha } = searchTerm;

    if (query && query.trim() !== '') {
      filtered = filtered.filter(anuncio => 
        (anuncio.titulo && anuncio.titulo.toLowerCase().includes(query.toLowerCase())) ||
        (anuncio.fecha && anuncio.fecha.includes(query))
      );
    }

    if (fecha && fecha.trim() !== '') {
      filtered = filtered.filter(anuncio => {
        const anuncioFecha = new Date(anuncio.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return anuncioFecha === fecha;
      });
    }

    setFilteredAnuncios(filtered);
  }, [searchTerm, anuncios]);

  const handleViewClick = (anuncioId) => {
    window.location.href = `/anuncio/${anuncioId}`;
  };

  const handleDeleteClick = async (anuncioId) => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await fetch(`${import.meta.env.VITE_URL}/anuncios/${anuncioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, 
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete anuncio: ${errorText}`);
      }

      const updatedAnuncios = anuncios.filter(anuncio => anuncio.id !== anuncioId);
      setAnuncios(updatedAnuncios);
      setFilteredAnuncios(updatedAnuncios);
    } catch (error) {
      console.error('Error deleting anuncio:', error);
      Swal.fire(
        'Error',
        'No se pudo eliminar el anuncio. Inténtalo de nuevo más tarde.',
        'error'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAnuncios.map(anuncio => (
        <AnuncioCard 
          key={anuncio.id} 
          anuncio={anuncio} 
          onViewClick={handleViewClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default SectionAnuncios;
