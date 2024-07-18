import AnuncioCard from '../molecules/AnuncioCard';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function SectionAnuncios({ searchTerm }) {
  const [anuncios, setAnuncios] = useState([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/anuncios')
      .then(response => response.json())
      .then(data => {
        setAnuncios(data);
        setFilteredAnuncios(data);
      })
      .catch(error => console.error('Error fetching data:', error));
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

  const handleDeleteClick = (anuncioId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/anuncios/${anuncioId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedAnuncios = anuncios.filter(anuncio => anuncio.id !== anuncioId);
          setAnuncios(updatedAnuncios);
          setFilteredAnuncios(updatedAnuncios);
        } else {
          Swal.fire('Error', 'No se pudo eliminar el anuncio. Inténtalo de nuevo más tarde.', 'error');
        }
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo eliminar el anuncio. Inténtalo de nuevo más tarde.', 'error');
      });
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
