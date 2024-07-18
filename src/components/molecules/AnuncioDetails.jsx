import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderAdmi from '../organisms/HeaderAdmi';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

function AnuncioDetail({ isEditing }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/anuncios/${id}`)
        .then(response => response.json())
        .then(data => {
          setAnuncio(data);
          setTitulo(data.titulo);
          setDescripcion(data.descripcion);
          setFecha(formatDate(data.fecha));
        })
        .catch(error => {
          console.error('Error:', error);
          Swal.fire('Error', 'Ocurrió un error al obtener los datos del anuncio.', 'error');
        });
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Confirmar actualización',
      text: "¿Desea actualizar el anuncio?",
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/anuncios/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            titulo,
            descripcion,
            fecha: formatDateToISO(fecha)
          })
        })
          .then(response => response.json())
          .then(data => {
            Swal.fire('Actualizado!', 'El anuncio ha sido actualizado correctamente.', 'success');
            navigate('/Anuncios');
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al actualizar el anuncio.', 'error');
          });
      }
    });
  };

  const handleBackClick = () => {
    navigate('/Anuncios');
  };

  if (!anuncio) {
    return <div className="p-14">Cargando...</div>;
  }

  return (
    <>
      <HeaderAdmi />
      <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded shadow-lg">
          <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
            {isEditing ? "Actualizar Anuncio" : "Detalles del anuncio"}
          </h1>
          {isEditing ? (
            <form className="space-y-6">
              <FormField
                label="Título"
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ingrese el título del anuncio"
              />
              <FormField
                label="Descripción"
                type="textarea"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción del anuncio"
                rows={8}
              />
              
              <div className="flex justify-center space-x-16">
                <Button onClick={handleUpdateClick}>Actualizar</Button>
                <Button onClick={handleBackClick}>Cancelar</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-12">
              <p><strong>{anuncio.titulo}</strong></p>
              <p>{anuncio.descripcion}</p>
              <p><strong>Fecha de publicación:</strong> {formatDate(anuncio.fecha)}</p>
              <div className="mt-4 flex justify-center">
                <Button onClick={handleBackClick}>Salir</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AnuncioDetail;
