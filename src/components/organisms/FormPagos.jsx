import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import HeaderAdmi from '../Alumno/organisms/HeaderAlumnos';

function FormPagos() {
  const [concepto, setConcepto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [anticipo, setAnticipo] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [selectedAlumno, setSelectedAlumno] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => setAlumnos(data))
      .catch(error => console.error('Error fetching alumnos:', error));
  }, [token]);

  useEffect(() => {
    if (parseFloat(cantidad) <= parseFloat(anticipo)) {
      setRealizado(true);
    } else {
      setRealizado(false);
    }
  }, [cantidad, anticipo]);

  const handleClick = (e) => {
    e.preventDefault();

    if (parseFloat(anticipo) > parseFloat(cantidad)) {
      Swal.fire('Error', 'El anticipo no puede ser mayor que la cantidad total.', 'error');
      return;
    }

    const alumnoSeleccionado = alumnos.find(alumno => alumno.id === selectedAlumno);
    Swal.fire({
      title: 'Confirmar publicación',
      text: "¿Desea crear este pago?",
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://jaguaresconnectapi.integrador.xyz/api/pagos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': token
          },
          body: JSON.stringify({
            concepto,
            cantidad: parseFloat(cantidad),
            anticipo: parseFloat(anticipo),
            realizado: realizado ? 1 : 0,
            alumno_matricula: alumnoSeleccionado.matricula,
            alumno_nombre: alumnoSeleccionado.nombre,
            alumno_apellido: alumnoSeleccionado.apellido
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
            Swal.fire('Creado!', 'El pago ha sido creado correctamente.', 'success');
            navigate('/Pagos');
          })
          .catch(error => {
            console.error('Error:', error);
            Swal.fire('Error', 'Ocurrió un error al crear el pago.', 'error');
          });
      } else if (result.isDenied) {
        Swal.fire('Cancelado', 'La creación del pago ha sido cancelada.', 'info');
      }
    });
  };
  
  const handleClickClose = () => {
    navigate("/Pagos");
};


  return (
    <>
      <HeaderAdmi />
      <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded shadow-lg">
          <form className="space-y-6">
            <FormField
              label="Seleccionar Alumno"
              type="select"
              id="alumno"
              value={selectedAlumno}
              onChange={(e) => setSelectedAlumno(e.target.value)}
              placeholder="Seleccione un alumno"
              options={alumnos.map(alumno => ({
                label: `${alumno.nombre} ${alumno.apellido}`,
                value: alumno.id
              }))}
            />
            <FormField
              label="Concepto"
              type="select"
              id="concepto"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              placeholder="Seleccione un concepto"
              options={[
                { label: 'Examen', value: 'Examen' },
                { label: 'Evento', value: 'Evento' },
                { label: 'Mensualidad', value: 'Mensualidad' },
                { label: 'Equipo', value: 'Equipo' },
              ]}
            />
            <FormField
              label="Cantidad"
              type="number"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              placeholder="Ingrese la cantidad del pago"
            />
            <FormField
              label="Anticipo"
              type="number"
              id="anticipo"
              value={anticipo}
              onChange={(e) => setAnticipo(e.target.value)}
              placeholder="Ingrese el anticipo del pago"
            />
            <div className="mt-4 flex justify-center space-x-2">
              <Button onClick={handleClick}>Crear Pago</Button>
              <Button onClick={handleClickClose}>Salir</Button>
                
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormPagos;
