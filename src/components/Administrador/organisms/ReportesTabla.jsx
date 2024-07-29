import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Tabla from '../atoms/Tabla';

function ReportesTabla({ searchTerm }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tipoPago, setTipoPago] = useState('realizados'); 
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const navigate = useNavigate();

  const months = {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = data.filter(reporte => {
        const monthName = reporte.mes ? months[reporte.mes] : '';
        return (
          (reporte.id && reporte.id.toString().includes(lowerCaseSearchTerm)) || 
          (monthName && monthName.toLowerCase().includes(lowerCaseSearchTerm))
        );
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  const fetchData = () => {
    fetch( `${import.meta.env.VITE_URL}/reportes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
    .then(response => response.json())
    .then(data => {
      setData(data);
      setFilteredData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };

  const headers = ['ID', 'Mes', 'Total Ingresos', 'Año'];


  const dataForTable = filteredData.map(reporte => ([
    reporte.id || 'N/A',
    reporte.mes ? months[reporte.mes] || 'N/A' : 'N/A', 
    reporte.totalingresos || 'N/A',
    reporte.año || 'N/A',
  ]));


  return (
    <>
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-semibold mb-4">{`Reportes ${tipoPago.charAt(0).toUpperCase() + tipoPago.slice(1)}`}</h1>
        <Tabla headers={headers} data={dataForTable} />
      </div>
    </>
  );
}

export default ReportesTabla;
