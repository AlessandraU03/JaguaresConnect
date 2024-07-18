import React, { useState } from 'react';
import HeaderAdmi from './HeaderAdmi';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


function FormInstructor() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();


    const handleClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Confirmar publicación',
            text: "¿Desea subir la publicación del evento?",
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch('https://jaguaresconnectapi.integrador.xyz/api/instructores', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                  "nombre": nombre,
                  "apellido": apellido,
                  "telefono": telefono,
                  "correo": correo,
                  "contraseña": contraseña
                })
              })
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  return response.json().then((data) => {
                    throw new Error(data.message || 'Error en la solicitud');
                  });
                }
                })
                .then(data => {
                  Swal.fire('Publicado!', 'El evento ha sido publicado correctamente.', 'success');
                  navigate('/Instructores');
                })
                .catch(error => {
                  console.error('Error:', error);
                  Swal.fire('Error', 'Ocurrió un error al publicar el evento.', 'error');
                });
            } else if (result.isDenied) {
              Swal.fire('Guardado', 'El evento ha sido guardado pero no publicado.', 'info');
            }
          });
        }
    return (
        
        <>
            <HeaderAdmi />
            <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Subir Equipo</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src="/images/equipo.jpg" alt="Equipo" className="w-full h-auto mb-4 md:mb-0" />
            <Button className="px-4 py-2 bg-[#8E9FA7] text-white rounded">
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Subir
            </Button>
          </div>
          <div className="md:w-1/2 md:ml-4">
            <div className="p-4">
                <form>
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
                        placeholder="Ingrese el correo electrónico"
                    />
                    <FormField
                        label="Contraseña"
                        type="password"
                        id="contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        placeholder="Ingrese la contraseña"
                    />
                    <div className='p-4'>
                  <Button onClick={handleClick}>Insertar registro</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default FormInstructor;
