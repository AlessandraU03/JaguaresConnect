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
    const [precioError, setPrecioError] = useState('');
    const [fechaError, setFechaError] = useState('');

    const handlePreciorBlur = (e) => {
        if (costo <= 0) {
            setPrecioError('El costo debe de ser mayor a 0');
        }
    };

    const handleCostoChange = (e) => {
        setCosto(e.target.value);
        if (precioError && e.target.value > 0) {
            setPrecioError('');
        }
    };

    const handleFechaBlur = (e) => {
        const today = new Date();
        const selectedDate = new Date(fecha);
        if (selectedDate <= today) {
            setFechaError('La fecha debe ser posterior a la actual');
        }
    };

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
        if (fechaError) {
            setFechaError('');
        }
    };

    const handleClick = (e) => {
      
      e.preventDefault();
      const hasErrors = Object.values(precioError).some(precioError => precioError !== '');
      if (hasErrors) {
        Swal.fire('Error', 'Por favor, corrija los errores en el formulario antes de enviarlo.', 'error');
        return;
      }

      if (!nombre || !fecha || !lugar || !hora || !categorias || !costo) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
      }
      Swal.fire({
            title: 'Confirmar registro',
            text: "¿Desea guardar el registro?",
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                e.preventDefault();
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

    return (
        <>
            <HeaderAdmi />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Subir Evento</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src="/images/Evento.jpg" alt="Evento" className="w-full h-auto mb-4 md:mb-0" />
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
                                    label="Fecha"
                                    type="date"
                                    id="fecha"
                                    value={fecha}
                                    onBlur={handleFechaBlur}
                                    onChange={handleFechaChange}
                                    placeholder="Ingresa la fecha del evento"
                                    error={fechaError}
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
                                    onBlur={handlePreciorBlur}
                                    onChange={handleCostoChange}
                                    placeholder="Ingrese el costo del evento"
                                    error={precioError}
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

export default FormEvento;