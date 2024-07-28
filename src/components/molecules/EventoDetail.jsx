import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../Alumno/organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from './FormField';
import Swal from 'sweetalert2';
import Tabla from '../atoms/Tabla'; // Asegúrate de que la ruta es correcta

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
    if (id) {
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          setEvento(data);
          setNombre(data.nombre);
          setFecha(formatDate(data.fecha));
          setLugar(data.lugar);
          setHora(data.hora);
          setCategorias(data.categorias);
          setCosto(data.costo);
        })
        .catch(error => console.error('Error fetching event data:', error));
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

    fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos-asistencias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        const asistenciasDelEvento = data.filter(asistencia => asistencia.evento_id === Number(id));
        setAsistencias(asistenciasDelEvento);
      })
      .catch(error => {
        console.error('Error fetching attendances:', error);
        Swal.fire(
          'Error',
          'No se pudieron cargar las asistencias. Inténtalo de nuevo más tarde.',
          'error'
        );
      });

    fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAlumnos(data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        Swal.fire(
          'Error',
          'No se pudieron cargar los alumnos. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  }, [id, token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Confirmar actualización',
      text: "¿Desea actualizar los datos del Evento?",
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${id}`, {
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
        })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.message || 'Error en la actualización');
              });
            }
            return response.json();
          })
          .then(data => {
            Swal.fire('Actualizado!', 'Los datos del evento han sido actualizados correctamente.', 'success');
            navigate('/Eventos');
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', error.message || 'Ocurrió un error al actualizar los datos del evento.', 'error');
          });
      }
    });
  };

  const handleImageUpload = (eventoId) => {
    if (!selectedFile) {
      Swal.fire('Error', 'Por favor selecciona una imagen antes de subir.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('event_id', eventoId);
    formData.append('image', selectedFile);

    fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos-img', {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Error uploading image');
          });
        }
        return response.json();
      })
      .then(data => {
        Swal.fire('Éxito!', 'La imagen del alumno ha sido subida correctamente.', 'success');
        setImages([...images, data]); // Agrega la nueva imagen a la lista de imágenes
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        Swal.fire('Error', error.message || 'Ocurrió un error al subir la imagen del alumno.', 'error');
      });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
            <img src={getImageUrl(evento.id)} alt={`${evento.nombre}`} className="w-[400px] h-[500px]" />
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
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingrese el nombre"
                />
                <FormField
                  label="Fecha"
                  type="date"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  placeholder="Ingrese la fecha"
                />
                <FormField
                  label="Lugar"
                  type="text"
                  id="lugar"
                  value={lugar}
                  onChange={(e) => setLugar(e.target.value)}
                  placeholder="Ingrese el lugar"
                />
                <FormField
                  label="Hora"
                  type="time"
                  id="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  placeholder="Ingrese la hora"
                />
                <FormField
                  label="Categorias"
                  type="text"
                  id="categorias"
                  value={categorias}
                  onChange={(e) => setCategorias(e.target.value)}
                  placeholder="Ingrese las categorías"
                />
                <FormField
                  label="Costo"
                  type="text"
                  id="costo"
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                  placeholder="Ingrese el costo"
                />
                <div className="flex justify-center space-x-16">
                  <Button onClick={handleUpdateClick}>Actualizar</Button>
                  <Button onClick={handleClick}>Cancelar</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-16 pe-28">
                <FormField label="Fecha" type="date" id="fecha" value={evento.fecha} readOnly />
                <FormField label="Lugar" type="text" id="lugar" value={evento.lugar} readOnly />
                <FormField label="Hora" type="text" id="hora" value={evento.hora} readOnly />
                <FormField label="Categorias" type="text" id="categorias" value={evento.categorias} readOnly />
                <FormField label="Costo" type="number" id="costo" value={evento.costo} readOnly />

                
              </div>
            )}
          </div>
        </div>
        
        {/* Mover la tabla de alumnos asistentes debajo del contenido del evento */}
        {!isEditing && (
          <div className="mt-10">
            <h2 className="text-center text-[#002033] text-xl font-bold mb-4">Alumnos Asistentes</h2>
            <Tabla headers={headers} data={data} />
          </div>
        )}
        <div className="mt-6 flex justify-center">
                  <Button onClick={handleClick}>Salir</Button>
                </div>

      </div>
    </>
  );
}

export default EventoDetail;
