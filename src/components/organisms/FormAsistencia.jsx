import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabla from '../atoms/Tabla';
import Swal from 'sweetalert2';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';

function FormAsistencia({ isEditing }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [alumnos, setAlumnos] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('authToken');

    useEffect(() => {
        // Fetch alumnos data
        fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(response => response.json())
            .then(data => {
                setAlumnos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching alumnos:', error);
                setError(error);
                setLoading(false);
            });

        // Fetch asistencia data if editing
        if (isEditing) {
            fetch(`https://jaguaresconnectapi.integrador.xyz/api/asistencias?lista_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    const asistenciaMap = {};
                    data.forEach(record => {
                        if (!asistenciaMap[record.alumno_id]) {
                            asistenciaMap[record.alumno_id] = {};
                        }
                        asistenciaMap[record.alumno_id][record.dia] = {
                            asistencia: record.asistencia === 1,
                        };
                    });
                    setCheckedItems(asistenciaMap);
                })
                .catch(error => {
                    console.error('Error fetching asistencias:', error);
                    setError(error);
                });
        }
    }, [id, isEditing, token]);

    const handleClick = () => {
        navigate("/Asistencia");
    };

    const handleAsistencia = () => {
        Swal.fire({
            title: isEditing ? 'Confirmar actualización' : 'Confirmar adición',
            text: isEditing ? '¿Desea actualizar la asistencia?' : '¿Desea agregar la asistencia?',
            showCancelButton: true,
            confirmButtonText: isEditing ? 'Actualizar' : 'Agregar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const requests = [];

                Object.keys(checkedItems).forEach(alumnoId => {
                    Object.keys(checkedItems[alumnoId]).forEach(dia => {
                        const asistencia = checkedItems[alumnoId][dia]?.asistencia || false;

                        const request = isEditing ? 
                            fetch(`https://jaguaresconnectapi.integrador.xyz/api/asistencias`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                                body: JSON.stringify({ alumno_id: alumnoId, fecha: new Date().toISOString().split('T')[0], asistencia, dia })
                            }) : 
                            fetch('https://jaguaresconnectapi.integrador.xyz/api/asistencias', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': token
                                },
                                body: JSON.stringify({ lista_id: id, alumno_id: alumnoId, asistencia, dia })
                            });

                        requests.push(
                            request
                                .then(response => {
                                    if (!response.ok) {
                                        return response.text().then(text => {
                                            console.error(`Error en la solicitud ${isEditing ? 'PUT' : 'POST'}: ${text}`);
                                            throw new Error(`Error en la solicitud ${isEditing ? 'PUT' : 'POST'}: ${text}`);
                                        });
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    console.log(`Respuesta de la solicitud ${isEditing ? 'PUT' : 'POST'}:`, data);
                                })
                                .catch(error => {
                                    console.error(`Error al ${isEditing ? 'actualizar' : 'agregar'} asistencia:`, error);
                                    Swal.fire('Error', `Ocurrió un error al ${isEditing ? 'actualizar' : 'agregar'} la asistencia: ${error.message}`, 'error');
                                })
                        );
                    });
                });

                // Handle all requests
                Promise.all(requests)
                    .then(() => {
                        Swal.fire('Éxito!', isEditing ? 'La asistencia ha sido actualizada correctamente.' : 'La asistencia ha sido agregada correctamente.', 'success');
                        navigate('/Asistencia');
                    })
                    .catch(error => {
                        Swal.fire('Error', `Ocurrió un error al procesar la solicitud: ${error.message}`, 'error');
                    });
            } else if (result.isDenied) {
                Swal.fire('Cancelado', `${isEditing ? 'La actualización' : 'La adición'} de asistencia ha sido cancelada.`, 'info');
            }
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los datos: {error.message}</div>;
    }

    const getAlumnoNombre = (alumno_id) => {
        const alumno = alumnos.find(alumno => alumno.id === alumno_id);
        return alumno ? `${alumno.nombre} ${alumno.apellido}` : alumno_id;
    };

    const handleButtonClick = (alumnoId, dia) => {
        setCheckedItems(prev => ({
            ...prev,
            [alumnoId]: {
                ...prev[alumnoId],
                [dia]: {
                    ...prev[alumnoId]?.[dia],
                    asistencia: !prev[alumnoId]?.[dia]?.asistencia
                }
            }
        }));
    };

    const headers = ['', '', 'Lunes', 'Miércoles', 'Viernes'];
    const data = alumnos.map(alumno => [
        alumno.id,
        getAlumnoNombre(alumno.id),
        <button
            key={`lunes-${alumno.id}`}
            onClick={() => handleButtonClick(alumno.id, 'lunes')}
            className={`px-4 py-2 text-white ${checkedItems[alumno.id]?.lunes?.asistencia ? 'bg-green-500' : 'bg-red-500'} rounded`}
        >
            {checkedItems[alumno.id]?.lunes?.asistencia ? 'Presente' : 'Ausente'}
        </button>,
        <button
            key={`miercoles-${alumno.id}`}
            onClick={() => handleButtonClick(alumno.id, 'miercoles')}
            className={`px-4 py-2 text-white ${checkedItems[alumno.id]?.miercoles?.asistencia ? 'bg-green-500' : 'bg-red-500'} rounded`}
        >
            {checkedItems[alumno.id]?.miercoles?.asistencia ? 'Presente' : 'Ausente'}
        </button>,
        <button
            key={`viernes-${alumno.id}`}
            onClick={() => handleButtonClick(alumno.id, 'viernes')}
            className={`px-4 py-2 text-white ${checkedItems[alumno.id]?.viernes?.asistencia ? 'bg-green-500' : 'bg-red-500'} rounded`}
        >
            {checkedItems[alumno.id]?.viernes?.asistencia ? 'Presente' : 'Ausente'}
        </button>
    ]);

    return (
        <>
            <HeaderAdmi />
            <div className="mx-auto p-10">
                <h1 className="text-2xl font-bold mb-4">Asistencia de la Semana {id}</h1>
                <div className="overflow-x-auto">
                    <Tabla headers={headers} data={data} />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={handleAsistencia}>Guardar</Button>
                    <Button onClick={handleClick}>Salir</Button>
                </div>
            </div>
        </>
    );
}

export default FormAsistencia;
