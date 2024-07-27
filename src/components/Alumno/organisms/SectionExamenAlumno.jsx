import React, { useState, useEffect } from 'react';
import ExamenCardAlumno from '../molecules/ExamenCard';
function SectionExamenAlumno() {
  
  const [examenes, setExamenes] = useState([]);
  const [filtrarExamen, setFiltrarExamen] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/examenes', {
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
  }, []);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtrarExamen.map(examen => (
        <ExamenCardAlumno
        key={examen.id} 
        examen={examen}/>
      ))}
    </div>
  );
}

export default SectionExamenAlumno;
