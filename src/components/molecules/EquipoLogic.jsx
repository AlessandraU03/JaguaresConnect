import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import HeaderAdmi from '../organisms/HeaderAdmi';
import { useNavigate } from 'react-router-dom';

function EquipoLogic({ isEditing }) {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('authToken');
    const [selectedFile, setSelectedFile] = useState(null); 
    const [images, setImages] = useState([]);

    const { id } = useParams(); 
    const [nombre, setNombre] = useState('');
    const [talla, setTalla] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [composicion, setComposicion] = useState('');
    const [color, setColor] = useState('');
    const [equipo, setEquipo] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    setEquipo(data);
                    setNombre(data.nombre);
                    setTalla(data.talla);
                    setPrecio(data.precio);
                    setDescripcion(data.descripcion);
                    setComposicion(data.composicion);
                    setColor(data.color);
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

    const handleBackClick = () => {
        navigate('/Equipos');
      };
    

    const handleUpdateClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Confirmar actualización',
            text: "¿Desea actualizar el equipo?",
            showCancelButton: true,
            confirmButtonText: 'Actualizar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://jaguaresconnectapi.integrador.xyz/api/equipos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        nombre,
                        talla,
                        precio,
                        descripcion,
                        composicion,
                        color
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        Swal.fire('Actualizado!', 'El equipo ha sido actualizado correctamente.', 'success');
                        navigate('/Equipos')
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        Swal.fire('Error', 'Ocurrió un error al actualizar el equipo.', 'error');
                    });
            }
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
      };
    
      const handleImageUpload = (equipoId) => {
        if (!selectedFile) {
          Swal.fire('Error', 'Por favor selecciona una imagen antes de subir.', 'error');
          return;
        }
    
        const formData = new FormData();
        formData.append('equipo_id', equipoId);
        formData.append('image', selectedFile);
    
        fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos-img', {
          method: 'POST',
          headers: {
            'Authorization': token
          },
          body: formData
        })
          .then(response => {
            if (!response.ok) {
              return response.json().then(err => {
                throw new Error(err.message || 'Error uploading image');
              });
            }
            return response.json();
          })
          .then(data => {
            Swal.fire('Éxito!', 'La imagen del alumno ha sido subida correctamente.', 'success');
            setImages([...images, data]); // Agrega la nueva imagen a la lista de imágenes
          })
          .catch(error => {
            console.error('Error uploading image:', error);
            Swal.fire('Error', error.message || 'Ocurrió un error al subir la imagen del alumno.', 'error');
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
    

    if (!equipo) {
        return <div className="p-4">Cargando...</div>;
    }

    return (
        <>
        <HeaderAdmi></HeaderAdmi>
        <div className="container mx-auto p-6">
            <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
                {isEditing ? "Actualizar Equipo" : "Detalles del equipo" }
            </h1>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
                <img src={getImageUrl(equipo.id)} alt={`${equipo.nombre} `} className="w-full h-auto" />
          {isEditing && (
              <>
                <input type="file" onChange={handleFileChange} />
                <Button onClick={() => handleImageUpload(equipo.id)}>Subir Alumno</Button>
              </>
            )}
                </div>
                <div className="md:w-1/2 md:ml-4">
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
                                label="Talla"
                                type="text"
                                id="talla"
                                value={talla}
                                onChange={(e) => setTalla(e.target.value)}
                                placeholder="Ingrese la talla"
                            />
                            <FormField
                                label="Precio"
                                type="number"
                                id="precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                placeholder="Ingrese el precio del equipo"
                            />
                            <FormField
                                label="Descripción"
                                type="text"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripción del equipo"
                            />
                            <FormField
                                label="Composición"
                                type="text"
                                id="composicion"
                                value={composicion}
                                onChange={(e) => setComposicion(e.target.value)}
                                placeholder="Ingrese la composición del equipo"
                            />
                            <FormField
                                label="Color"
                                type="text"
                                id="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                placeholder="Ingrese el color del equipo"
                            />
                            <div className="flex justify-center space-x-16">
                                <Button onClick={handleUpdateClick}>Actualizar</Button>
                                <Button onClick={handleBackClick}>Cancelar</Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-12">
                            <p><strong>{equipo.nombre}</strong> </p>
                            <p><strong>Talla:</strong> {equipo.talla}</p>
                            <p className='text-red-500'>${equipo.precio}</p>
                            <p>{equipo.descripcion}</p>
                            <p><strong>Composición:</strong> {equipo.composicion}</p>
                            <div className="mt-4">
                                <Button onClick={handleBackClick}>Salir</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default EquipoLogic;
