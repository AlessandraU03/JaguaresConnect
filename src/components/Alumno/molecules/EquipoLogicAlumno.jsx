import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../atoms/Button';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Text from '../atoms/Text';

function EquipoLogicAlumno() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('authToken');
    const alumno_id = sessionStorage.getItem('id'); 
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [equipo, setEquipo] = useState(null);

    // Obtener la información del equipo
    useEffect(() => {
        if (id) {
            fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`, {
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
        fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos-img', {
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
            alumno_id: alumno_id,  // Usamos el ID del alumno desde sessionStorage
            equipo_id: id          // Usamos el ID del equipo desde los parámetros
        };

        fetch('https://jaguaresconnectapi.integrador.xyz/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(orderData)  // Enviamos los datos en el formato correcto
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
          console.log(`No image found for alumno ${equipoId}`);
          return '/default-image.png'; // Default image if no image is found
        }
        const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
        console.log(`Image URL for alumno ${equipoId}: ${url}`);
        return url;
      };
    

    const handleBackClick = () => {
        navigate('/EquiposAlumnos');
    };
    
    if (!equipo) {
        return <div className="p-4">Cargando...</div>;
    }

    return (
        <>
        <HeaderAlumnos/>
        <div className="container mx-auto p-6">
            <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
                 "Detalles del equipo"
            </h1>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
                <img src={getImageUrl(equipo.id)} alt={`${equipo.nombre} `} className="w-full h-auto" />
                </div>
                <div className="md:w-1/2 md:ml-4">
                    <div className="space-y-12">
                        <Text><strong>{equipo.nombre}</strong> </Text>
                        <p><strong>Talla:</strong> {equipo.talla}</p>
                        <p className='text-red-500'>${equipo.precio}</p>
                        <p>{equipo.descripcion}</p>
                        <p><strong>Composición:</strong> {equipo.composicion}</p>
                        <div className="mt-4 flex space-x-4">
                            <Button onClick={handleOrderClick}>Ordenar Equipo</Button>
                            <Button onClick={handleBackClick}>Salir</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default EquipoLogicAlumno;
