import React, { useState, useEffect } from 'react';
import ExamenCardAlumno from '../molecules/ExamenCard';
import Swal from 'sweetalert2';

function SectionExamenAlumno() {
  const [examenes, setExamenes] = useState([]);
  const [filtrarExamen, setFiltrarExamen] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/examenes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setExamenes(data);
        setFiltrarExamen(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {filtrarExamen.map(examen => (
        <ExamenCardAlumno
          key={examen.id}
          examen={examen}
        />
      ))}
    </div>
  );
}

export default SectionExamenAlumno;
