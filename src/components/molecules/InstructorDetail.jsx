import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField'; 

function InstructorDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/instructores/${id}`)
      .then(response => response.json())
      .then(data => setInstructor(data))
      .catch(error => console.error('Error fetching instructor data:', error));
  }, [id]);

  const handleClick = () => {
    navigate("/Instructores");
  };

  if (!instructor) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-aut p-14">
        <h1 className="text-xl text-center font-semibold mb-4">{instructor.nombre}</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <div></div>
          <div>
            <FormField label="Apellido" type="text" id="apellido" value={instructor.apellido} readOnly />
            <FormField label="Teléfono" type="text" id="telefono" value={instructor.telefono} readOnly />
            <FormField label="Correo Electrónico" type="email" id="correo" value={instructor.correo} readOnly />
            <FormField label="ID" type="text" id="id" value={instructor.id} readOnly />
            <div className="mt-4">
              <Button onClick={handleClick}>Salir</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorDetail;
