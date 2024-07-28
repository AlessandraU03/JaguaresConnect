import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';
import Swal from 'sweetalert2';
import HeaderAlumnos from '../organisms/HeaderAlumnos';

function EventoDetailAlumno() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem('authToken');
  const alumnoId = sessionStorage.getItem('id'); // Recupera el alumnoId del sessionStorage
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
      <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">Detalles del Evento</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
          <img src={getImageUrl(evento.id)} alt={`${evento.nombre}`} className="w-[400px] h-[500px]" />
          </div>
          <div className="md:w-1/2 md:ml-4">
            <div className="space-y-4">
              <FormField label="Fecha" type="text" id="fecha" value={evento.fecha} readOnly />
              <FormField label="Lugar" type="text" id="lugar" value={evento.lugar} readOnly />
              <FormField label="Hora" type="correo" id="hora" value={evento.hora} readOnly />
              <FormField label="Categorias" type="text" id="categorias" value={evento.categorias} readOnly />
              <FormField label="Costo" type="number" id="costo" value={evento.costo} readOnly />
              <div className="mt-8 flex justify-center space-x-10">
                <Button onClick={handleConfirmAttendance} disabled={asistenciaConfirmada}>
                  {asistenciaConfirmada ? 'Asistencia Confirmada' : 'Confirmar Asistencia'}
                </Button>
                <Button onClick={handleClick}>Salir</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventoDetailAlumno;
