import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tabla from '../atoms/Tabla';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';

function ListaAsistencia() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [alumnos, setAlumnos] = useState([]);
    const [asistencia, setAsistencia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('authToken'); // Obtener el token del sessionStorage

    useEffect(() => {
        async function fetchData() {
            try {
                // Obtener la lista de alumnos
                const alumnosResponse = await fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos', {
                    headers: {
                        'Authorization': token, // Agregar el token en los headers
                        'Content-Type': 'application/json'
                    }
                });
                if (!alumnosResponse.ok) {
                    throw new Error('Error al obtener los datos de alumnos');
                }
                const alumnosData = await alumnosResponse.json();
                setAlumnos(alumnosData);

                // Obtener los datos de asistencia para la lista actual
                const asistenciaResponse = await fetch(`https://jaguaresconnectapi.integrador.xyz/api/asistencias?lista_id=${id}`, {
                    headers: {
                        'Authorization': token, // Agregar el token en los headers
                        'Content-Type': 'application/json'
                    }
                });
                if (!asistenciaResponse.ok) {
                    throw new Error('Error al obtener los datos de asistencia');
                }
                const asistenciaData = await asistenciaResponse.json();
                setAsistencia(asistenciaData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [id, token]); // Agregar `token` a las dependencias del useEffect

    const handleClick = () => {
        navigate("/Asistencia");
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

    const headers = ['', '', 'Lunes', 'Miércoles', 'Viernes'];
    const data = alumnos.map(alumno => [
        alumno.id,
        getAlumnoNombre(alumno.id),
        <span
            key={`lunes-${alumno.id}`}
            className={`inline-block w-6 h-6 rounded-full ${asistencia.find(record => record.alumno_id === alumno.id && record.dia === 'lunes')?.asistencia ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>,
        <span
            key={`miercoles-${alumno.id}`}
            className={`inline-block w-6 h-6 rounded-full ${asistencia.find(record => record.alumno_id === alumno.id && record.dia === 'miercoles')?.asistencia ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>,
        <span
            key={`viernes-${alumno.id}`}
            className={`inline-block w-6 h-6 rounded-full ${asistencia.find(record => record.alumno_id === alumno.id && record.dia === 'viernes')?.asistencia ? 'bg-green-500' : 'bg-red-500'}`}
        ></span>
    ]);

    return (
        <>
            <HeaderAdmi />
            <div className="mx-auto p-10">
                <h1 className="text-2xl font-bold mb-4">Asistencia de la Semana {id}</h1>
                <div className="overflow-x-auto">
                    <Tabla headers={headers} data={data} />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button onClick={handleClick}>Salir</Button>
                </div>
            </div>
        </>
    );
}

export default ListaAsistencia;
