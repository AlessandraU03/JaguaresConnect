import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Swal from 'sweetalert2';
import Perfil from '../../atoms/Perfil';

function StudentDetail({ isEditing }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem('authToken'); 

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [cinta, setCinta] = useState('');
  const [mensualidad, setMensualidad] = useState('');
  const [tutor_nombre, setTutor_nombre] = useState('');
  const [tutor_apellido, setTutor_apellido] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [fechainicio, setFechainicio] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [horario, setHorario] = useState('');
  const [activo, setActivo] = useState(false);
  const [curp, setCurp] = useState('');



  useEffect(() => {
    if (id) {
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
         }
      })
        .then(response => response.json())
        .then(data => {
          setAlumno(data);
          setNombre(data.nombre);
          setApellido(data.apellido);
          setEdad(data.edad);
          setCinta(data.cinta);
          setMensualidad(data.mensualidad);
          setTutor_nombre(data.tutor_nombre);
          setTutor_apellido(data.tutor_apellido);
          setNacimiento(formatDate(data.nacimiento));
          setTelefono(data.telefono);
          setCorreo(data.correo);
          setFechainicio(formatDate(data.fechainicio));
          setHorario(data.horario);
          setActivo(data.activo === 1);
          setCurp(data.curp);
        })
        .catch(error => console.error('Error fetching student data:', error));
    }

    fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos-img', {
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
  }, [token, id]);



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };




  const handleClick = () => {
    navigate("/Alumnos");
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const age = calculateAge(formatDate(nacimiento));

    if (age < 18 && (!tutor_nombre || !tutor_apellido)) {
      Swal.fire('Error', 'Los menores de edad deben contar con un tutor, por favor ingrese el nombre y apellido del tutor.', 'error');
      return;
    }

    if (age < 3) {
      Swal.fire('Error', 'La edad del alumno debe ser mayor a 3 años.', 'error');
      return;
    }
    Swal.fire({
      title: 'Confirmar actualización',
      text: "¿Desea actualizar los datos del estudiante?",
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          },
          body: JSON.stringify({
            nombre,
            apellido,
            edad,
            cinta,
            mensualidad,
            tutor_nombre,
            tutor_apellido,
            nacimiento: formatDate(nacimiento),
            telefono,
            correo,
            fechainicio: formatDate(fechainicio),
            horario,
            contraseña,
            activo, 
            curp
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
          Swal.fire('Actualizado!', 'Los datos del estudiante han sido actualizados correctamente.', 'success');
          navigate('/Alumnos');
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', error.message || 'Ocurrió un error al actualizar los datos del estudiante.', 'error');
        });
      }
    });

  };


  const calculateAge = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!alumno) {
    return <div className="p-4">Cargando...</div>;
  }

  const getImageUrl = (alumnoId) => {
    const image = images.find(img => img.alumno_id === alumnoId);
    if (!image) {
      console.log(`No image found for alumno ${alumnoId}`);
      return '/default-image.png';
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${alumnoId}: ${url}`);
    return url;
  };

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
          {isEditing ? "Actualizar Estudiante" : "Detalles del Estudiante"}
        </h1>
        <div className="p-2 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center justify-center">
          <Perfil src={getImageUrl(alumno.id)} alt={`${alumno.nombre} ${alumno.apellido}`} className="w-full h-auto" />
          </div>
          <div className="col-span-1">
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
                  label="Apellido"
                  type="text"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Ingrese el apellido"
                />
                <FormField
                  label="Edad"
                  type="number"
                  id="edad"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  placeholder="Ingrese la edad"
                />
                <FormField
                  label="Cinta"
                  type="select"
                  id="cinta"
                  value={cinta}
                  onChange={(e) => setCinta(e.target.value)}
                  placeholder="Seleccione el nivel de cinta"
                  options={[
                    { label: '10° KUP', value: '10° KUP' },
                    { label: '9° KUP', value: '9° KUP' },
                    { label: '8° KUP', value: '8° KUP' },
                    { label: '7° KUP', value: '7° KUP' },
                    { label: '6° KUP', value: '6° KUP' },
                    { label: '5° KUP', value: '5° KUP' },
                    { label: '4° KUP', value: '4° KUP' },
                    { label: '3° KUP', value: '3° KUP' },
                    { label: '2° KUP', value: '2° KUP' },
                    { label: '1° KUP', value: '1° KUP' },
                    { label: '1° PUM', value: '1° PUM' },
                    { label: '2° PUM', value: '2° PUM' },
                    { label: '3° PUM', value: '3° PUM' },
                    { label: '1° DAN', value: '1° DAN' },
                    { label: '2° DAN', value: '2° DAN' },
                    { label: '3° DAN', value: '3° DAN' },
                    { label: '4° DAN', value: '4° DAN' },
                  ]}
                />

                <FormField
                  label="Teléfono"
                  type="text"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ingrese el teléfono"
                />
                <FormField
                  label="Correo"
                  type="email"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Ingrese el correo"
                />
                 <FormField
                  label="Fecha de Inicio"
                  type="date"
                  id="fechainicio"
                  value={fechainicio}
                  onChange={(e) => setFechainicio(e.target.value)}
                  placeholder="Seleccione la fecha de inicio"
                />
                <FormField
                  label="Activo"
                  type="checkbox"
                  id="activo"
                  value={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                />
              </form>
            ) : (
              <div className="space-y-4">
                <FormField
                  label="Nombre"
                  type="text"
                  id="nombre"
                  value={nombre}
                  readOnly
                />
                <FormField
                  label="Apellido"
                  type="text"
                  id="apellido"
                  value={apellido}
                  readOnly
                />
                <FormField
                  label="Cinta"
                  type="text"
                  id="cinta"
                  value={cinta}
                  readOnly
                />
                <FormField
                  label="Mensualidad"
                  type="text"
                  id="mensualidad"
                  value={mensualidad}
                  readOnly
                />
                <FormField
                  label="Nombre del Tutor"
                  type="text"
                  id="tutor_nombre"
                  value={tutor_nombre}
                  readOnly
                />
                <FormField
                  label="Apellido del Tutor"
                  type="text"
                  id="tutor_apellido"
                  value={tutor_apellido}
                  readOnly
                />
                <FormField
                  label="Activo"
                  type="checkbox"
                  id="activo"
                  value={activo}
                  readOnly
                />
              </div>
            )}
          </div>
          <div className="col-span-1">
            {isEditing ? (
              <form className="space-y-4">
                <FormField
                  label="Mensualidad"
                  type="select"
                  id="mensualidad"
                  value={mensualidad}
                  onChange={(e) => setMensualidad(e.target.value)}
                  placeholder="Seleccione la mensualidad"
                  options={[
                    { label: '400', value: 400 },
                    { label: '450', value: 450 },
                    { label: '700', value: 700 }
                  ]}
                />
                <FormField
                  label="Tutor Nombre"
                  type="text"
                  id="tutor_nombre"
                  value={tutor_nombre}
                  onChange={(e) => setTutor_nombre(e.target.value)}
                  placeholder="Ingrese el nombre del tutor"
                />
                <FormField
                  label="Tutor Apellido"
                  type="text"
                  id="tutor_apellido"
                  value={tutor_apellido}
                  onChange={(e) => setTutor_apellido(e.target.value)}
                  placeholder="Ingrese el apellido del tutor"
                />
                <FormField
                  label="Fecha de Nacimiento"
                  type="date"
                  id="nacimiento"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  placeholder="Seleccione la fecha de nacimiento"
                />
                <FormField
                  label="Contraseña"
                  type="password"
                  id="contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="Ingrese la contraseña"
                />
                <FormField
                  label="Horario"
                  type="select"
                  id="horario"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  placeholder="Seleccione el horario"
                  options={[
                    { label: '5pm-6pm', value: '5pm-6pm' },
                    { label: '6pm-7pm', value: '6pm-7pm' },
                    { label: '5pm-7pm', value: '5pm-7pm' }
                  ]}
                />
                <FormField
                  label="CURP"
                  type="text"
                  id="curp"
                  value={curp}
                  onChange={(e) => setCurp(e.target.value)}
                  placeholder="Ingrese el CURP"
                />
                <div className="flex justify-center py-6 space-x-12">
                  <Button onClick={handleUpdateClick}>Actualizar</Button>
                  <Button onClick={handleClick}>Salir</Button>
                </div>  
              </form>
            ) : (
              <div className="space-y-4">
                <FormField
                  label="Nacimiento"
                  type="date"
                  id="nacimiento"
                  value={nacimiento}
                  readOnly
                />
                <FormField
                  label="Teléfono"
                  type="text"
                  id="telefono"
                  value={telefono}
                  readOnly
                />
                <FormField
                  label="Correo Electrónico"
                  type="email"
                  id="correo"
                  value={correo}
                  readOnly
                />
                <FormField
                  label="Fecha de Inicio"
                  type="date"
                  id="fechainicio"
                  value={fechainicio}
                  readOnly
                />
                <FormField
                  label="Horario"
                  type="text"
                  id="horario"
                  value={horario}
                  readOnly
                />
                <FormField
                  label="Contraseña"
                  type="password"
                  id="contraseña"
                  value={contraseña}
                  readOnly
                />
                <FormField
                  label="CURP"
                  type="text"
                  id="curp"
                  value={curp}
                  readOnly
                />
                <div className="mt-4 flex justify-center">
                  <Button onClick={handleClick}>Salir</Button>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
         
    </>
  );
}

export default StudentDetail;