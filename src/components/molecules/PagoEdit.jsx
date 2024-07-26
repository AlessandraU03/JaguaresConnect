import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';

function PagoEdit() {
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [concepto, setConcepto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [anticipo, setAnticipo] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [alumno_nombre, setAlumno_nombre] = useState('');
  const [alumno_apellido, setAlumno_apellido] = useState('');
  const [conceptos] = useState([
    { label: 'Examen', value: 'Examen' },
    { label: 'Evento', value: 'Evento' },
    { label: 'Mensualidad', value: 'Mensualidad' },
    { label: 'Equipo', value: 'Equipo' },
  ]);
  const [token] = useState(sessionStorage.getItem('authToken'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/pagos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate('/login');
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setPago(data);
          setConcepto(data.concepto);
          setCantidad(data.cantidad);
          setAnticipo(data.anticipo);
          setRealizado(data.realizado);
          setAlumno_apellido(data.alumno_apellido);
          setAlumno_nombre(data.alumno_nombre);
        }
      })
      .catch((error) => {
        console.error('Error fetching pago:', error);
        navigate('/login');
      });
  }, [id, token, navigate]);

  useEffect(() => {
    if (parseFloat(cantidad) <= parseFloat(anticipo)) {
      setRealizado(true);
    } else {
      setRealizado(false);
    }
  }, [cantidad, anticipo]);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }
    Swal.fire({
      title: 'Confirmar actualización',
      text: '¿Desea actualizar los datos del pago?',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://jaguaresconnectapi.integrador.xyz/api/pagos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify({
            concepto,
            cantidad: parseFloat(cantidad),
            anticipo: parseFloat(anticipo),
            realizado: realizado ? 1 : 0,
            alumno_nombre,
            alumno_apellido,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((err) => {
                throw new Error(err.message || 'Error en la actualización');
              });
            }
            return response.json();
          })
          .then(() => {
            Swal.fire('Actualizado!', 'Los datos del pago han sido actualizados correctamente.', 'success');
            navigate('/Pagos');
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire('Error', error.message || 'Ocurrió un error al actualizar los datos del pago.', 'error');
          });
      } else {
        Swal.fire('Cancelado', 'La actualización del pago ha sido cancelada.', 'info');
      }
    });
  };

  const handleClickClose = () => {
    navigate("/Pagos");
};


  if (!pago) return <p>Cargando...</p>;

  const handleAlumnoChange = (e) => {
    const [nombre, apellido] = e.target.value.split(' ');
    setAlumno_nombre(nombre);
    setAlumno_apellido(apellido);
  };

  return (
    <>
      <HeaderAdmi />
      <div className="p-4 md:p-8 lg:p-12 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Editar Pago</h1>
          <form className="space-y-6">
            <FormField
              label="Seleccionar Alumno"
              type="text"
              id="alumno"
              value={`${alumno_nombre} ${alumno_apellido}`}
              onChange={handleAlumnoChange}
              readOnly
            />
            <FormField
              label="Concepto"
              type="text"
              id="concepto"
              value={concepto}
              onChange={(e) => setConcepto(e.target.value)}
              readOnly
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
              <Button onClick={handleEdit}>Crear Pago</Button>
              <Button onClick={handleClickClose}>Salir</Button>
                
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PagoEdit;
