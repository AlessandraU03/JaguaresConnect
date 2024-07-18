import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorCard from '../molecules/InstructorCard';
import Swal from 'sweetalert2';

function InstructorList({ searchTerm }) {
  const navigate = useNavigate();
  const [instructores, setInstructores] = useState([]);
  const [filtrarInstructor, setFiltrarInstructor] = useState([]);


  useEffect(() => {
    fetch('https://jaguaresconnectapi.integrador.xyz/api/instructores')
      .then(response => response.json())
      .then(data => {
        setInstructores(data);
        setFiltrarInstructor(data);
  })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleViewClick = (instructorId) => {
    navigate(`/instructor/${instructorId}`);
  };

  useEffect(() => {
    const results = instructores.filter(instructor =>
      instructor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.id.toString().includes(searchTerm)
    );
    setFiltrarInstructor(results);
  }, [searchTerm, instructores]);

  const handleDeleteClick = (instructorId) => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/instructores/${instructorId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedInstructor = instructores.filter(instructor => instructor.id !== instructorId);
          setInstructores(updatedInstructor);
          setFiltrarInstructor(updatedInstructor);
        } else {
          console.error('Failed to delete student');
          Swal.fire(
            'Error',
            'No se pudo eliminar al instructor. Inténtalo de nuevo más tarde.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Error deleting student:', error);
        Swal.fire(
          'Error',
          'No se pudo eliminar al instructor. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtrarInstructor.map(instructor => (
        <InstructorCard 
        key={instructor.id} 
        instructor={instructor}
        onViewClick={handleViewClick} 
        onDeleteClick={handleDeleteClick} />
      ))}
    </div>
  );
}

export default InstructorList;
