import React, { useState } from 'react';
import Button from '../atoms/Button';
import HeaderAdmi from './HeaderAdmi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import FormField from '../molecules/FormField';

function FormEquipo() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [talla, setTalla] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [composicion, setComposicion] = useState('');
  const [color, setColor] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Confirmar publicación',
      text: "¿Desea subir el equipo?",
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://jaguaresconnectapi.integrador.xyz/api/equipos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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
            Swal.fire('Error', 'Ocurrió un error al publicar el equipos.', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Guardado', 'El equipo ha sido guardado pero no publicado.', 'info');
      }
    });
  }


  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-6">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">Subir Equipo</h1>
        <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center justify-center">
        <img src="/images/equipo.jpg" alt="Equipo" className="w-full h-auto" />
        <Button>
          <FontAwesomeIcon icon={faUpload} className="mr-2" />
          Subir Equipo
          </Button>
        </div>

          <div className="md:w-1/2 md:ml-4">
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
                  { label: 'Protector Bucal', value: 'Mensualidad' },
                  { label: 'Guante ', value: 'Equipo' },
                  { label: 'Empeinera', value: 'Empeinera' },
                  { label: 'Espinillera', value: 'Espinillera'},
                  { label: 'Concha', value: 'Concha' },
                  { label: 'Cadera', value: 'Cadera' },
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
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ingrese el precio del equipo"
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
                <Button onClick={handleClick}> Subir
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormEquipo;
