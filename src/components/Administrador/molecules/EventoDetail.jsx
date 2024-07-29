import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';
import FormField from './FormField';
import Swal from 'sweetalert2';
import Tabla from '../atoms/Tabla'; 
import Perfil from '../../General/atoms/Perfil';

function EventoDetail({ isEditing }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  const [fecha, setFecha] = useState("");
  const [nombre, setNombre] = useState("");
  const [lugar, setLugar] = useState("");
  const [hora, setHora] = useState("");
  const [categorias, setCategorias] = useState("");
  const [costo, setCosto] = useState("");

  const handleClick = () => {
    navigate("/Eventos");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const eventResponse = await fetch(`${import.meta.env.VITE_URL}/eventos/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          });
          const eventData = await eventResponse.json();
          setEvento(eventData);
          setNombre(eventData.nombre);
          setFecha(formatDate(eventData.fecha));
          setLugar(eventData.lugar);
          setHora(eventData.hora);
          setCategorias(eventData.categorias);
          setCosto(eventData.costo);
        }

        const imagesResponse = await fetch(`${import.meta.env.VITE_URL}/eventos-img`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
          }
        });
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        const attendancesResponse = await fetch(`${import.meta.env.VITE_URL}/eventos-asistencias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
          }
        });
        const attendancesData = await attendancesResponse.json();
        const asistenciasDelEvento = attendancesData.filter(asistencia => asistencia.evento_id === Number(id));
        setAsistencias(asistenciasDelEvento);

        const studentsResponse = await fetch(`${import.meta.env.VITE_URL}/alumnos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Access-Control-Allow-Origin': '*',
          }
        });
        const studentsData = await studentsResponse.json();
        setAlumnos(studentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire(
          'Error',
          'Ocurrió un error al cargar los datos. Inténtalo de nuevo más tarde.',
          'error'
        );
      }
    };

    fetchData();
  }, [id, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Confirmar actualización',
      text: "¿Desea actualizar los datos del Evento?",
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${import.meta.env.VITE_URL}/eventos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': token
            },
            body: JSON.stringify({
              nombre,
              fecha: formatDate(fecha),
              lugar,
              hora,
              categorias,
              costo,
            })
          });

          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Error en la actualización');
          }

          Swal.fire('Actualizado!', 'Los datos del evento han sido actualizados correctamente.', 'success');
          navigate('/Eventos');
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Error', error.message || 'Ocurrió un error al actualizar los datos del evento.', 'error');
        }
      }
    });
  };

  const handleImageUpload = async (eventoId) => {
    if (!selectedFile) {
      Swal.fire('Error', 'Por favor selecciona una imagen antes de subir.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('event_id', eventoId);
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/eventos-img`, {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Error uploading image');
      }

      const data = await response.json();
      Swal.fire('Éxito!', 'La imagen del evento ha sido subida correctamente.', 'success');
      setImages([...images, data]); 
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire('Error', error.message || 'Ocurrió un error al subir la imagen del evento.', 'error');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const getImageUrl = (eventoId) => {
    const image = images.find(img => img.event_id === eventoId);
    if (!image) {
      console.log(`No image found for event ${eventoId}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for event ${eventoId}: ${url}`);
    return url;
  };

  const headers = ["ID", "Nombre", "Apellido", "Evento"];
  const data = asistencias.map(asistencia => {
    const alumno = alumnos.find(alumno => alumno.id === asistencia.alumno_id);
    return [
      alumno ? alumno.id : asistencia.id, 
      alumno ? alumno.nombre : "Desconocido",
      alumno ? alumno.apellido : "Desconocido",
      evento ? evento.nombre : "Desconocido"
    ];
  });

  if (!evento) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
          {isEditing ? "Actualizar Evento" : "Detalles del Evento"}
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
            <Perfil src={getImageUrl(evento.id)} alt={`${evento.nombre}`} className="w-[400px] h-[500px]" />
            {isEditing && (
              <>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={() => handleImageUpload(evento.id)}>Subir Imagen</Button>
              </>
            )}
          </div>
          <div className="md:w-1/2 md:ml-4">
            {isEditing ? (
              <form className="space-y-4">
                <FormField
                  label="Nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <FormField
                  label="Fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                <FormField
                  label="Lugar"
                  type="text"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                />
                <FormField
                  label="Hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
                <FormField
                  label="Categorías"
                  type="text"
                  value={categorias}
                  onChange={(e) => setCategorias(e.target.value)}
                />
                <FormField
                  label="Costo"
                  type="number"
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                />
                <div className="text-center mt-8">
                  <Button onClick={handleUpdateClick}>Guardar Cambios</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p className="text-xl"><strong>Nombre:</strong> {nombre}</p>
                <p className="text-xl"><strong>Fecha:</strong> {fecha}</p>
                <p className="text-xl"><strong>Lugar:</strong> {lugar}</p>
                <p className="text-xl"><strong>Hora:</strong> {hora}</p>
                <p className="text-xl"><strong>Categorías:</strong> {categorias}</p>
                <p className="text-xl"><strong>Costo:</strong> {costo}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl text-[#002033] font-bold mb-4">Alumnos Asistentes</h2>
          <Tabla headers={headers} data={data} />
        </div>
        <div className="text-center mt-8">
          <Button onClick={handleClick}>Volver a Eventos</Button>
        </div>
      </div>
    </>
  );
}

export default EventoDetail;
