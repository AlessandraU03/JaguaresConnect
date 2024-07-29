import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

function AnuncioDetailsAlumno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem('authToken');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`${import.meta.env.VITE_URL}/anuncios/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          setAnuncio(data);
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setFecha(formatDate(data.fecha));
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', 'Ocurrió un error al obtener los datos del anuncio.', 'error');
        });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };


  const handleBackClick = () => {
    navigate('/Alumno');
  };

  if (!anuncio) {
    return <div className="p-14">Cargando...</div>;
  }

  return (
    <>
      <HeaderAlumnos />
      <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded shadow-lg">
          <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
            "Detalles del anuncio"
          </h1>
          
            <div className="space-y-12">
              <p><strong>{anuncio.titulo}</strong></p>
              <p>{anuncio.descripcion}</p>
              <p><strong>Fecha de publicación:</strong> {formatDate(anuncio.fecha)}</p>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleBackClick}>Salir</Button>
              </div>
            </div>
        
        </div>
      </div>
    </>
  );
}

export default AnuncioDetailsAlumno;
