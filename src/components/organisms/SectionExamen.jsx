import React, { useState, useEffect } from 'react';
import ExamenCard from '../molecules/ExamenCard';

function SectionExamen({ searchTerm }) {
  const [examenes, setExamenes] = useState([]);
  const [filtrarExamen, setFiltrarExamen] = useState([]);


  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/examenes')
      .then(response => response.json())
      .then(data => {
        setExamenes(data);
        setFiltrarExamen(data);
  })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const results = examenes.filter(examen =>
      examen.nombrealumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examen.id.toString().includes(searchTerm)
    );
    setFiltrarExamen(results);
  }, [searchTerm, examenes]);

  const handleDeleteClick = (examenId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/examenes/${examenId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedExamen = examenes.filter(examen => examen.id !== examenId);
          setExamenes(updatedExamen);
          setFiltrarExamen(updatedExamen);
        } else {
          console.error('Failed to delete student');
          Swal.fire(
            'Error',
            'No se pudo eliminar al examen. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar al examen. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtrarExamen.map(examen => (
        <ExamenCard 
        key={examen.id} 
        examen={examen}
        onDeleteClick={handleDeleteClick} />
      ))}
    </div>
  );
}

export default SectionExamen;
