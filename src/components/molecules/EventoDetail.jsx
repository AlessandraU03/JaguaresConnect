import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../Alumno/organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from './FormField';
import Swal from 'sweetalert2';

function EventoDetail({isEditing}) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
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
    if(id){
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/eventos/${id}`,{
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
      }
    )
      .catch(error => console.error('Error fetching student data:', error));
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
                fecha,
                lugar,
                hora,
                categorias,
                costo,
                fecha: formatDateToISO(fecha),
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
      


  if (!evento) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
            {isEditing ? "Actualizar Evento" : "Detalles del Evento" }
        </h1>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
                <img src="/images/equipo.jpg" alt="Equipo" className="w-full h-auto" />
                {isEditing && (
                    <Button>
                        Subir 
                    </Button>
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
                            id="talla"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            placeholder="Ingrese la talla"
                        />
                        <FormField
                            label="Lugar"
                            type="text"
                            id="lugar"
                            value={lugar}
                            onChange={(e) => setLugar(e.target.value)}
                            placeholder="Ingrese el precio del equipo"
                        />
                        <FormField
                            label="Hora"
                            type="time"
                            id="hora"
                            value={hora}
                            onChange={(e) => setHora(e.target.value)}
                            placeholder="Ingrese la descripción del equipo"
                        />
                        <FormField
                            label="Categorias"
                            type="text"
                            id="categorias"
                            value={categorias}
                            onChange={(e) => setCategorias(e.target.value)}
                            placeholder="Ingrese la composición del equipo"
                        />
                        <FormField
                            label="Costo"
                            type="number"
                            id="costo"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            placeholder="Ingrese el color del equipo"
                        />
                        <div className="flex justify-center space-x-16">
                            <Button onClick={handleUpdateClick}>Actualizar</Button>
                            <Button onClick={handleClick}>Cancelar</Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                  <FormField label="Fecha" type="text" id="fecha" value={evento.fecha} readOnly />
                  <FormField label="Lugar" type="text" id="lugar" value={evento.lugar} readOnly />
                  <FormField label="Hora" type="correo" id="hora" value={evento.hora} readOnly />
                  <FormField label="Categorias" type="text" id="categorias" value={evento.categorias} readOnly />
                  <FormField label="Costo" type="number" id="costo" value={evento.costo} readOnly />
                  <div className="mt-4">
                  <Button onClick={handleClick}>Salir</Button>
                    </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    </>
);

/*   return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
      <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
          {isEditing ? "Actualizar Estudiante" : "Detalles del Estudiante"}
        </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div></div>
      <div>

        </div>
        </div>
      </div>
    </>
  ); */
}


export default EventoDetail;
