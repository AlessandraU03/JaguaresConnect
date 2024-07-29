import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import HeaderAdmi from './HeaderAdmi';

function FormAnuncios() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }
    Swal.fire({
      title: 'Confirmar publicación',
      text: "¿Desea subir la publicación del anuncio?",
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_URL}/anuncios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token

          },
          body: JSON.stringify({
            "titulo": titulo,
            "descripcion": descripcion,
            "fecha": fecha,
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error en la solicitud');
            }
          })
          .then(data => {
            Swal.fire('Publicado!', 'El anuncio ha sido publicado correctamente.', 'success');
            navigate('/Anuncios');
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al publicar el anuncio.', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Guardado', 'El anuncio ha sido guardado pero no publicado.', 'info');
      }
    });
  }

  const handleClickClose = () => {
    navigate("/Anuncios");
  };


  return (
    <>
      <HeaderAdmi />
      <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded shadow-lg">
          <form className="space-y-6">
            <FormField
              label="Titulo"
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
             <div className="pb-6 flex justify-center space-x-6">
              <Button onClick={handleClick}>Publicar</Button>
              <Button onClick={handleClickClose}>Salir</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormAnuncios;
