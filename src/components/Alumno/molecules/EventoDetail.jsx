import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';
import Swal from 'sweetalert2';
import HeaderAlumnos from '../organisms/HeaderAlumnos';

function EventoDetailAlumno() {
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
    navigate("/EventosAlumnos");
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

 


  if (!evento) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
    <HeaderAlumnos/>
    <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
            Detalles del Evento
        </h1>
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
                <img src="/images/equipo.jpg" alt="Equipo" className="w-full h-auto" />
                
            </div>
            <div className="md:w-1/2 md:ml-4">
               
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


export default EventoDetailAlumno;
