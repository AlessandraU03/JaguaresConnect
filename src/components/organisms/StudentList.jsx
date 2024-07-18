import React, { useState, useEffect } from 'react';
import StudentCard from '../molecules/StudentCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function StudentList({ searchTerm }) {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [filteredAlumnos, setFilteredAlumnos] = useState([]);

  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos')
      .then(response => response.json())
      .then(data => {
        setAlumnos(data);
        setFilteredAlumnos(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (alumnoId) => {
    navigate(`/alumnos/${alumnoId}`);
  };

  const handleEditClick = (alumnoId) => {
    navigate(`/alumnos/edit/${alumnoId}`);
  };

  const handleDeleteClick = (alumnoId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${alumnoId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedAlumnos = alumnos.filter(alumno => alumno.id !== alumnoId);
          setAlumnos(updatedAlumnos);
          setFilteredAlumnos(updatedAlumnos);
        } else {
          console.error('Failed to delete student');
          Swal.fire(
            'Error',
            'No se pudo eliminar al alumno. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar al alumno. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };

  useEffect(() => {
    const results = alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.id.toString().includes(searchTerm)
    );
    setFilteredAlumnos(results);
  }, [searchTerm, alumnos]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAlumnos.map(alumno => (
        <StudentCard 
          key={alumno.id} 
          alumno={alumno}
          onViewClick={handleViewClick} 
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default StudentList;
