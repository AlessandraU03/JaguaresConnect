import React, { useState, useEffect } from 'react';
import PagosPendientesCard from '../molecules/PagosPendientesCard';

import { useNavigate } from 'react-router-dom';

function PagosPendientes() {
  const [data, setData] = useState([]);
  const [tipoPago, setTipoPago] = useState('pendientes'); // Define tipoPago con un valor por defecto
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [tipoPago]); // Asegúrate de que tipoPago esté en las dependencias

  const fetchData = async () => {
    try {
      const response = await fetch('https://jaguaresconnectapi.integrador.xyz/api/pagos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // Asegúrate de usar "Bearer" si tu API lo requiere
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const filteredData = data.filter(pago =>
        tipoPago === 'realizados' ? pago.realizado === 1 : pago.realizado === 0
      );
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="grid p-4 gap-6">
      <h1>Pagos Pendientes</h1>
      {data.map(pago => (
        <PagosPendientesCard key={pago.id} pago={pago} tipoPago={tipoPago} />
      ))}
      
    </div>
  );
}

export default PagosPendientes;
