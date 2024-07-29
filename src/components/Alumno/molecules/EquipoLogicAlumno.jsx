import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../atoms/Button';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Perfil from '../../General/atoms/Perfil';

function EquipoLogicAlumno() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('authToken');
    const alumno_id = sessionStorage.getItem('id'); 
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [equipo, setEquipo] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`${import.meta.env.VITE_URL}/equipos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos del equipo.');
                }
                return response.json();
            })
            .then(data => {
                setEquipo(data);
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Ocurrió un error al obtener los datos del equipo.', 'error');
            });
        }
        fetch(`${import.meta.env.VITE_URL}/equipos-img`, {
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
    }, [id, token]);

    const handleOrderClick = () => {
        if (!equipo || !alumno_id) {
            Swal.fire('Error', 'No se pudo obtener la información del equipo o el ID del alumno.', 'error');
            return;
        }

        const orderData = {
            alumno_id: alumno_id,  
            equipo_id: id         
        };

        fetch(`${import.meta.env.VITE_URL}/pedidos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(orderData)  
        })
        .then(response => {
            if (response.ok) {
                Swal.fire('Éxito', '¡Pedido realizado con éxito!', 'success');
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Error al realizar el pedido.');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', error.message, 'error');
        });
    };

    const getImageUrl = (equipoId) => {
        const image = images.find(img => img.equipo_id === equipoId);
        if (!image) {
          console.log(`No image found for equipo ${equipoId}`);
          return '/default-image.png';
        }
        const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
        console.log(`Image URL for alumno ${equipoId}: ${url}`);
        return url;
      };
    

    const handleBackClick = () => {
        navigate('/EquiposAlumno');
    };
    
    if (!equipo) {
        return <div className="p-4">Cargando...</div>;
    }

    return (
        <>
          <HeaderAlumnos />
          <h1 className="text-center text-[#002033] text-2xl font-bold mb-12 mt-8">Detalles del Equipo</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-8">
            <div className="flex flex-col items-center mb-8">
              <Perfil src={getImageUrl(equipo.id)} alt={`${equipo.nombre}`} />
            </div>
            <div className="md:w-1/2 md:ml-6 space-y-6 my-20 ">
              <p className="text-xl font-semibold mb-4">
                <strong>{equipo.nombre}</strong>
              </p>
              <p className="mb-2">
                <strong>Talla:</strong> {equipo.talla}
              </p>
              <p className="text-red-500 text-lg font-bold mb-4">
                ${equipo.precio}
              </p>
              <p className="mb-4">{equipo.descripcion}</p>
              <p className="mb-4">
                <strong>Composición:</strong> {equipo.composicion}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button onClick={handleOrderClick}>Ordenar Equipo</Button>
                <Button onClick={handleBackClick}>Salir</Button>
              </div>
            </div>
          </div>
        </>
      );
}

export default EquipoLogicAlumno;
