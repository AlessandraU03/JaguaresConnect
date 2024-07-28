import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';
import Swal from 'sweetalert2';

function AlumnoCard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem('authToken');
  const [selectedFile, setSelectedFile] = useState(null);

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
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAlumno(data);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setEdad(data.edad);
        setCinta(data.cinta);
        setMensualidad(data.mensualidad);
        setTutor_nombre(data.tutor_nombre);
        setTutor_apellido(data.tutor_apellido);
        setNacimiento(data.nacimiento);
        setTelefono(data.telefono);
        setCorreo(data.correo);
        setFechainicio(data.fechainicio);
        setContraseña(data.contraseña);
        setHorario(data.horario);
        setActivo(data.activo);
        setCurp(data.curp);
        setImages(data.images || []);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchAlumno();
  }, [id, token]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre, apellido, edad, cinta, mensualidad, tutor_nombre, tutor_apellido, nacimiento, telefono,
          correo, fechainicio, contraseña, horario, activo, curp
        }),
      });

      if (response.ok) {
        const updatedAlumno = await response.json();
        setAlumno(updatedAlumno);
        setIsEditing(false);
        Swal.fire('Guardado', 'La información del alumno se ha guardado correctamente', 'success');
      } else {
        Swal.fire('Error', 'No se pudo guardar la información del alumno', 'error');
      }
    } catch (error) {
      console.error('Error saving student data:', error);
      Swal.fire('Error', 'Ocurrió un error al guardar la información del alumno', 'error');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      Swal.fire('Error', 'Por favor, seleccione una imagen para subir.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos-img/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedAlumno = await response.json();
        setImages(updatedAlumno.images || []);
        Swal.fire('Subido', 'La imagen se ha subido correctamente', 'success');
      } else {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire('Error', 'Ocurrió un error al subir la imagen', 'error');
    }
  };

  if (!alumno) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <HeaderAlumnos />
      <h1>Detalles del Alumno</h1>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Alumno ${nombre}`} className="w-28 h-auto" />
      ))}
      <form>
        <FormField label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} disabled={!isEditing} />
        <FormField label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} disabled={!isEditing} />
        <FormField label="Edad" value={edad} onChange={e => setEdad(e.target.value)} disabled={!isEditing} />
        <FormField label="Cinta" value={cinta} onChange={e => setCinta(e.target.value)} disabled={!isEditing} />
        <FormField label="Mensualidad" value={mensualidad} onChange={e => setMensualidad(e.target.value)} disabled={!isEditing} />
        <FormField label="Nombre del Tutor" value={tutor_nombre} onChange={e => setTutor_nombre(e.target.value)} disabled={!isEditing} />
        <FormField label="Apellido del Tutor" value={tutor_apellido} onChange={e => setTutor_apellido(e.target.value)} disabled={!isEditing} />
        <FormField label="Nacimiento" value={nacimiento} onChange={e => setNacimiento(e.target.value)} disabled={!isEditing} />
        <FormField label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} disabled={!isEditing} />
        <FormField label="Correo" value={correo} onChange={e => setCorreo(e.target.value)} disabled={!isEditing} />
        <FormField label="Fecha de Inicio" value={fechainicio} onChange={e => setFechainicio(e.target.value)} disabled={!isEditing} />
        <FormField label="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} disabled={!isEditing} />
        <FormField label="Horario" value={horario} onChange={e => setHorario(e.target.value)} disabled={!isEditing} />
        <FormField label="Activo" value={activo} onChange={e => setActivo(e.target.checked)} type="checkbox" disabled={!isEditing} />
        <FormField label="CURP" value={curp} onChange={e => setCurp(e.target.value)} disabled={!isEditing} />
        {isEditing ? (
          <>
            <Button onClick={handleSaveClick}>Guardar</Button>
            <input type="file" onChange={handleFileChange} />
            <Button onClick={handleUploadClick}>Subir Imagen</Button>
          </>
        ) : (
          <Button onClick={handleEditClick}>Editar</Button>
        )}
      </form>
    </div>
  );
}

export default AlumnoCard;
