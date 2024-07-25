import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import HeaderAdmi from './HeaderAdmi';

function FormAlumno() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');

  const [formData, setFormData] = useState({
    nombre: '', apellido: '', cinta: '', mensualidad: '', tutor_nombre: '',
    tutor_apellido: '', nacimiento: '', telefono: '', correo: '', fechainicio: '',
    horario: '', contraseña: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const calculateAge = (birthDate) => {
    const today = new Date(), birthDateObj = new Date(birthDate);
    return today.getFullYear() - birthDateObj.getFullYear() - (today.getMonth() < birthDateObj.getMonth() || (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate()));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const age = calculateAge(formData.nacimiento);
    if (age < 3) return Swal.fire('Error', 'La edad del alumno debe ser mayor a 3 años.', 'error');
    if (age < 18 && (!formData.tutor_nombre || !formData.tutor_apellido)) return Swal.fire('Error', 'Los menores de edad deben contar con un tutor.', 'error');
    if (Object.values(formData).some(value => !value)) return Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');

    const alumnoData = { ...formData, activo: 1, mensualidad: parseFloat(formData.mensualidad.replace('$', '')) };
    Swal.fire({ title: 'Confirmar registro', text: '¿Desea guardar el registro?', showCancelButton: true })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos', {
              method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': token }, body: JSON.stringify(alumnoData)
            });
            if (!response.ok) throw new Error(await response.json().message);
            Swal.fire('Registrado!', 'El registro ha sido insertado correctamente.', 'success');
            navigate('/Alumnos');
          } catch (error) {
            Swal.fire('Error', `Ocurrió un error al insertar el registro: ${error.message}`, 'error');
          }
        } else if (result.isDenied) Swal.fire('Guardado', 'El registro ha sido guardado pero no insertado.', 'info');
      });
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 3);

  const { nombre, apellido, cinta, mensualidad, tutor_nombre, tutor_apellido, nacimiento, telefono, correo, fechainicio, horario, contraseña } = formData;

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Registro de Estudiantes</h1>
        <div className="p-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <div></div>
          <div>
            <form className="space-y-4">
              <FormField label="Nombre(s)" type="text" id="nombre" value={nombre} onChange={handleChange} placeholder="Ingrese el nombre" />
              <FormField label="Apellido(s)" type="text" id="apellido" value={apellido} onChange={handleChange} placeholder="Ingrese el apellido" />
              <FormField label="Cinta" type="select" id="cinta" value={cinta} onChange={handleChange} placeholder="Seleccione el nivel de cinta" options={[
                { label: '10° KUP', value: '10° KUP' }, { label: '9° KUP', value: '9° KUP' }, { label: '8° KUP', value: '8° KUP' },
                { label: '7° KUP', value: '7° KUP' }, { label: '6° KUP', value: '6° KUP' }, { label: '5° KUP', value: '5° KUP' },
                { label: '4° KUP', value: '4° KUP' }, { label: '3° KUP', value: '3° KUP' }, { label: '2° KUP', value: '2° KUP' },
                { label: '1° KUP', value: '1° KUP' }, { label: '1° PUM', value: '1° PUM' }, { label: '2° PUM', value: '2° PUM' },
                { label: '3° PUM', value: '3° PUM' }, { label: '1° DAN', value: '1° DAN' }, { label: '2° DAN', value: '2° DAN' },
                { label: '3° DAN', value: '3° DAN' }, { label: '4° DAN', value: '4° DAN' }
              ]} />
              <FormField label="Mensualidad" type="select" id="mensualidad" value={mensualidad} onChange={handleChange} placeholder="Seleccione la mensualidad" options={[
                { label: '400', value: 400 }, { label: '450', value: 450 }, { label: '700', value: 700 }
              ]} />
              <FormField label="Nombre del Tutor" type="text" id="tutor_nombre" value={tutor_nombre} onChange={handleChange} placeholder="Ingrese el nombre del tutor" />
              <FormField label="Apellido del Tutor" type="text" id="tutor_apellido" value={tutor_apellido} onChange={handleChange} placeholder="Ingrese el apellido del tutor" />
            </form>
          </div>
          <div className="col-span-1">
            <form className="space-y-4">
              <FormField label="Nacimiento" type="date" id="nacimiento" value={nacimiento} onChange={handleChange} placeholder="Ingrese la fecha de nacimiento" min={minDate.toISOString().split("T")[0]} />
              <FormField label="Telefono" type="text" id="telefono" value={telefono} onChange={handleChange} placeholder="Ingrese el número telefónico" />
              <FormField label="Correo Electrónico" type="email" id="correo" value={correo} onChange={handleChange} placeholder="Ingrese el correo electrónico" />
              <FormField label="Fecha de Inicio" type="date" id="fechainicio" value={fechainicio} onChange={handleChange} placeholder="Ingrese la fecha de inicio" />
              <FormField label="Horario" type="select" id="horario" value={horario} onChange={handleChange} placeholder="Seleccione el horario" options={[
                { label: '5pm-6pm', value: '5pm-6pm' }, { label: '6pm-7pm', value: '6pm-7pm' }, { label: '5pm-7pm', value: '5pm-7pm' }
              ]} />
              <FormField label="Contraseña" type="password" id="contraseña" value={contraseña} onChange={handleChange} placeholder="Ingrese la contraseña" />
              <div className="flex justify-start mt-4">
                <Button onClick={handleClick}>Insertar registro</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormAlumno;
