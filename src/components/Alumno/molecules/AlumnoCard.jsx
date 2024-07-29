import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from '../../General/molecules/FormField';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Perfil from '../../General/atoms/Perfil';


function AlumnoCard() {
  const { id } = useParams();
  const [alumno, setAlumno] = useState(null);
  const [images, setImages] = useState([]);
  const token = sessionStorage.getItem('authToken');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const alumnoId = sessionStorage.getItem('id'); 
  
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
        const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${alumnoId}`, {
          headers: { Authorization: token },
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
        setNacimiento(formatDate(data.nacimiento));
        setTelefono(data.telefono);
        setCorreo(data.correo);
        setFechainicio(formatDate(data.fechainicio));
        setHorario(data.horario);
        setActivo(data.activo === 1);
        setCurp(data.curp);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchAlumno();
    fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos-img', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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
      text: "¿Desea actualizar los datos del estudiante?",
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updateData = {
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
          activo,
          curp,
          contraseña
        };
  
       
  
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${alumnoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          },
          body: JSON.stringify(updateData)
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
          navigate('/Alumno');
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', error.message || 'Ocurrió un error al actualizar los datos del estudiante.', 'error');
        });
      }
    });
  };
  

  const handleClick = () => {
    navigate("/Alumno");
  };


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      Swal.fire('Error', 'Por favor, seleccione una imagen para subir.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('alumno_id', alumnoId);
    formData.append('image', selectedFile);

    try {
      const response = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos-img`, {
        method: 'POST',
        headers: {
          Authorization: token,
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

  const getImageUrl = (alumnoId) => {
    const image = images.find(img => img.alumno_id === alumnoId);
    if (!image) {
      console.log(`No image found for alumno ${alumnoId}`);
      return '/default-image.png'; // Default image if no image is found
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${alumnoId}: ${url}`);
    return url;
  };

  if (!alumno) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <HeaderAlumnos />
      <h1 className="text-2xl font-bold mb-4 text-center mt-6">Detalles del Alumno</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      <div className="flex flex-col items-center justify-center">
          <Perfil src={getImageUrl(alumno.id)} alt={`${alumno.nombre} ${alumno.apellido}`} className="w-full h-auto" />
          {isEditing && (
              <>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={() => handleImageUpload(alumno.id)}>Subir Imagen</Button>
              </>
            )}
          </div>
        
        <div className="flex flex-col space-y-2">
          <FormField label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} readOnly />
          <FormField label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} readOnly />
          <FormField label="Edad" value={edad} onChange={e => setEdad(e.target.value)} readOnly />
          <FormField 
          label="Cinta"
                type="select"
                id="cinta"
                value={cinta}
                onChange={(e) => setCinta(e.target.value)}
                placeholder="Seleccione el nivel de cinta"
                options = {[
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
                readOnly />
          <FormField  label="Mensualidad"
                type="select"
                id="mensualidad"
                value={mensualidad}
                onChange={(e) => setMensualidad(e.target.value)}
                placeholder="Seleccione la mensualidad"
                options={[
                  { label: '$400', value: 400 },
                  { label: '$450', value: 450 },
                  { label: '$700', value: 700 }
                ]}
                readOnly />
          <FormField label="Nombre del Tutor" value={tutor_nombre} onChange={e => setTutor_nombre(e.target.value)} readOnly  />
          <FormField label="Apellido del Tutor" value={tutor_apellido} onChange={e => setTutor_apellido(e.target.value)} readOnly/>
          <FormField label="Nacimiento" type="date" value={nacimiento} onChange={e => setNacimiento(e.target.value)} readOnly/>
          </div>
        <div className="flex flex-col space-y-2">
          <FormField label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} disabled={!isEditing} />
          <FormField label="Correo" value={correo} onChange={e => setCorreo(e.target.value)} disabled={!isEditing} />
          <FormField label="Fecha de Inicio" type="date" value={fechainicio} onChange={e => setFechainicio(e.target.value)} readOnly />
          <FormField label="Contraseña" type="password" value={contraseña} onChange={e => setContraseña(e.target.value)} disabled={!isEditing} />
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
                ]} readOnly
                />
           <FormField label="Activo" value={activo ? 'Sí' : 'No'} onChange={e => setActivo(e.target.value)} disabled={!isEditing} />
            <FormField label="CURP" value={curp} onChange={e => setCurp(e.target.value)} disabled={!isEditing} />
          <div className="mt-4 flex justify-center space-x-10">
            {isEditing ? (
              <div className='mt-4 flex justify-center space-x-10'>
                <Button onClick={handleUpdateClick}>Guardar</Button>
                <Button onClick={handleClick}>Salir</Button>
              </div>              
            ) : (
              <div className='mt-8 flex justify-center space-x-10'>
                <Button onClick={handleEditClick}>Editar</Button>
              <Button onClick={handleClick}>Salir</Button>
              </div>
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumnoCard;