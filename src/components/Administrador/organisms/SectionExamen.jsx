import React, { useState, useEffect } from 'react';
import ExamenCard from '../molecules/ExamenCard';
import Swal from 'sweetalert2';

function SectionExamen({ searchTerm }) {
  const [examenes, setExamenes] = useState([]);
  const [filtrarExamen, setFiltrarExamen] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('authToken'));
  const [images, setImages] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

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

    fetch(`${import.meta.env.VITE_URL}/alumnos-img`, {
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
    const results = examenes.filter(examen =>
      examen.nombrealumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      examen.id.toString().includes(searchTerm)
    );
    setFiltrarExamen(results);
  }, [searchTerm, examenes]);

  const handleDeleteClick = (examenId) => {
    fetch(`${import.meta.env.VITE_URL}/examenes/${examenId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
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

  const getImageUrl = (alumnoId) => {
    const image = images.find(img => img.alumno_id === alumnoId);
    if (!image) {
      console.log(`No image found for alumno ${alumnoId}`);
      return '/default-image.png'; 
    }
    const url = `https://jaguaresconnectapi.integrador.xyz/${image.image_path.replace('\\', '/')}`;
    console.log(`Image URL for alumno ${alumnoId}: ${url}`);
    return url;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtrarExamen.map(examen => (
        <ExamenCard 
          key={examen.id} 
          examen={examen}
          imageUrl={getImageUrl(examen.idalumno)}
          onDeleteClick={() => handleDeleteClick(examen.id)} 
        />
      ))}
    </div>
  );
}

export default SectionExamen;
