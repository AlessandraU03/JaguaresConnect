import React, { useState } from 'react';
import Button from '../atoms/Button';
import HeaderAdmi from './HeaderAdmi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';

function FormEquipo() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [composicion, setComposicion] = useState('');
  const [color, setColor] = useState('');
  const [precioError, setPrecioError] = useState('');

  const handlePrecioChange = (e) => {
    const value = e.target.value;
    setPrecio(value);
    if (value <= 0) {
      setPrecioError('El precio debe de ser mayor a 0');
    } else {
      setPrecioError('');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    if (precioError) {
      Swal.fire('Error', 'Por favor, corrija los errores en el formulario antes de enviarlo.', 'error');
      return;
    }
    if (!nombre || !descripcion || !precio || !talla || !color || !composicion) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    Swal.fire({
      title: 'Confirmar publicación',
      text: "¿Desea subir el equipo?",
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_URL}/equipos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          },
          body: JSON.stringify({
            "nombre": nombre,
            "talla": talla,
            "precio": precio,
            "descripcion": descripcion,
            "composicion": composicion,
            "color": color 
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
            Swal.fire('Publicado!', 'El equipo ha sido publicado correctamente.', 'success');
            navigate('/Equipos');
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al publicar el equipo.', 'error');
          });
      }
    });
  }

  return (
    <>
      <HeaderAdmi />
      <div className="flex items-center justify-center min-h-screen ">
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Subir Equipo</h1>
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
              label="Tipo"
              type="select"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ingrese la descripción del equipo"
              options={[
                { label: 'Uniforme', value: 'Uniforme' },
                { label: 'Peto', value: 'Peto' },
                { label: 'Protector Bucal', value: 'Protector Bucal' },
                { label: 'Guante', value: 'Guante' },
                { label: 'Empeinera', value: 'Empeinera' },
                { label: 'Espinillera', value: 'Espinillera' },
                { label: 'Concha', value: 'Concha' },
                { label: 'Codera', value: 'Codera' },
                { label: 'Careta', value: 'Careta' },
                

              ]}
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
              onChange={handlePrecioChange}
              placeholder="Ingrese el precio del equipo"
              error={precioError}
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
            <div className="flex justify-center">
              <Button onClick={handleClick}> Subir</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormEquipo;
