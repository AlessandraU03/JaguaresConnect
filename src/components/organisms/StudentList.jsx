import React, { useState, useEffect } from 'react';
import StudentCard from '../molecules/StudentCard';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function StudentList({ searchTerm }) {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [images, setImages] = useState([]);
  const [filteredAlumnos, setFilteredAlumnos] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/alumnos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        setAlumnos(data);
        setFilteredAlumnos(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        Swal.fire(
          'Error',
          'No se pudo cargar la lista de alumnos. Inténtalo de nuevo más tarde.',
          'error'
        );
      });

    fetch('https://jaguaresconnectapi.integrador.xyz/api/alumnos-img', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => response.json())
      .then(data => {
        setImages(data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        Swal.fire(
          'Error',
          'No se pudieron cargar las imágenes. Inténtalo de nuevo más tarde.',
          'error'
        );
      });
  }, [token]);

  useEffect(() => {
    const results = alumnos.filter(alumno =>
      alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.id.toString().includes(searchTerm)
    );
    setFilteredAlumnos(results);
  }, [searchTerm, alumnos]);

  const handleViewClick = (alumnoId) => {
    navigate(`/alumnos/${alumnoId}`);
  };

  const handleEditClick = (alumnoId) => {
    navigate(`/alumnos/edit/${alumnoId}`);
  };

  const handleDeleteClick = (alumnoId) => {
    fetch(`${import.meta.env.VITE_URL}/alumnos/${alumnoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        const updatedAlumnos = alumnos.filter(alumno => alumno.id !== alumnoId);
        setAlumnos(updatedAlumnos);
        setFilteredAlumnos(updatedAlumnos);
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

  const getImageUrl = (alumnoId) => {
    const image = images.find(img => img.alumno_id === alumnoId);
    if (!image) {
      console.log(`No image found for alumno ${alumnoId}`);
      return '/default-image.png'; // Default image if no image is found
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${alumnoId}: ${url}`);
    return url;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAlumnos.map(alumno => (
        <StudentCard 
          key={alumno.id}
          alumno={alumno}
          imageUrl={getImageUrl(alumno.id)}
          onViewClick={handleViewClick} 
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

export default StudentList;
