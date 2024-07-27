import AnuncioCard from '../molecules/AnuncioCardAlumno';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SectionAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnuncios = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          throw new Error('Token no encontrado');
        }
        
        const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/anuncios', {
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
        setAnuncios(data);
        setFilteredAnuncios(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'No se pudieron cargar los anuncios.', 'error');
      }
    };

    fetchAnuncios();
  }, []);

  const handleViewClick = (anuncioId) => {
    navigate(`/anuncio/${anuncioId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAnuncios.map(anuncio => (
        <AnuncioCard 
          key={anuncio.id} 
          anuncio={anuncio} 
          onViewClick={handleViewClick}
        />
      ))}
    </div>
  );
}

export default SectionAnuncios;
