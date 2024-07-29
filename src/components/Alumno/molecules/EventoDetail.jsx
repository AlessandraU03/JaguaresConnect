import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';
import Swal from 'sweetalert2';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Perfil from '../../atoms/Perfil';

function EventoDetailAlumno() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem('authToken');
  const alumnoId = sessionStorage.getItem('id'); 
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [fecha, setFecha] = useState('');
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [hora, setHora] = useState('');
  const [categorias, setCategorias] = useState('');
  const [costo, setCosto] = useState('');
  const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false);

  const handleClick = () => {
    navigate('/EventosAlumnos');
  };

  useEffect(() => {
    if (id) {
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEvento(data);
          setNombre(data.nombre);
          setFecha(formatDate(data.fecha));
          setLugar(data.lugar);
          setHora(data.hora);
          setCategorias(data.categorias);
          setCosto(data.costo);
        })
        .catch((error) => console.error('Error fetching event data:', error));
    }
    fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos-img', {
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

  }, [id, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleConfirmAttendance = () => {
    if (!alumnoId) {
      Swal.fire('Error', 'ID del alumno no encontrado', 'error');
      return;
    }

    fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos-asistencias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        alumno_id: alumnoId, // Usa el alumnoId recuperado
        evento_id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || 'Error al confirmar asistencia');
          });
        }
        return response.json();
      })
      .then(() => {
        Swal.fire('Éxito', 'Asistencia confirmada', 'success');
        setAsistenciaConfirmada(true); // Actualiza el estado para indicar que la asistencia ha sido confirmada
      })
      .catch((error) => {
        console.error('Error confirming attendance:', error);
        Swal.fire('Error', error.message || 'Ocurrió un error al confirmar la asistencia', 'error');
      });
  };

  const getImageUrl = (eventoId) => {
    const image = images.find(img => img.event_id === eventoId);
    if (!image) {
      console.log(`No image found for event ${eventoId}`);
      return '/default-image.png'; // Default image if no image is found
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for event ${eventoId}: ${url}`);
    return url;
  };

  if (!evento) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAlumnos />
      <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">Detalles del Evento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-6">
        <div className="flex flex-col items-center">
          <Perfil src={getImageUrl(evento.id)} alt={`${evento.nombre}`} />
        </div>
        <div className="md:w-1/2 md:ml-4 space-y-4 my-6">
          <FormField label="Fecha" type="text" id="fecha" value={fecha} readOnly />
          <FormField label="Lugar" type="text" id="lugar" value={lugar} readOnly />
          <FormField label="Hora" type="text" id="hora" value={hora} readOnly />
          <FormField label="Categorías" type="text" id="categorias" value={categorias} readOnly />
          <FormField label="Costo" type="text" id="costo" value={costo} readOnly />
          <div className="mt-8 flex justify-center space-x-10">
            <Button onClick={handleConfirmAttendance} disabled={asistenciaConfirmada}>
              {asistenciaConfirmada ? 'Asistencia Confirmada' : 'Confirmar Asistencia'}
            </Button>
            <Button onClick={handleClick}>Salir</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventoDetailAlumno;
