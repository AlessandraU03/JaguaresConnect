import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from './HeaderAdmi';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


function FormEvento() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('authToken');
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [lugar, setLugar] = useState('');
    const [hora, setHora] = useState('');
    const [categorias, setCategorias] = useState('');
    const [costo, setCosto] = useState('');

    const handleClick = (e) => {
      e.preventDefault();
        Swal.fire({
            title: 'Confirmar registro',
            text: "¿Desea guardar el registro?",
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {e.preventDefault();
        fetch('https://jaguaresconnectapi.integrador.xyz/api/eventos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            },
            body: JSON.stringify({
                "nombre": nombre,
                "fecha": fecha,
                "lugar": lugar,
                "hora": hora,
                "categorias": categorias,
                "costo": costo
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
            Swal.fire('Registrado!', 'El registro ha sido insertado correctamente.', 'success');
            navigate('/Eventos');
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', `Ocurrió un error al insertar el registro: ${error.message}`, 'error');
          });
        } else if (result.isDenied) {
            Swal.fire('Guardado', 'El registro ha sido guardado pero no insertado.', 'info');
          }
        });
        
    };

        
  const handleClickClose = () => {
    navigate("/Eventos");
  };

    return (
        
        <>
            <HeaderAdmi />
            <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-10 g w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Subir Evento</h1>
        
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
                        label="Fecha"
                        type="date"
                        id="fecha"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        placeholder="Ingresa la fecha del evento"
                    />
                    <FormField
                        label="Lugar"
                        type="text"
                        id="lugar"
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        placeholder="Ingrese el lugar del evento"
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
                        placeholder="Ingrese la categoria del evento"
                    />
                    <FormField
                        label="Costo"
                        type="number"
                        id="costo"
                        value={costo}
                        onChange={(e) => setCosto(e.target.value)}
                        placeholder="Ingrese el costo del evento"
                    />
                     <div className="pt-6  flex justify-center space-x-6">
          <Button onClick={handleClick}>Publicar</Button>
          <Button onClick={handleClickClose}>Salir</Button>
        </div>
              </form>
            </div>
          </div>
        </div>
      
        </>
    );
}

export default FormEvento;
