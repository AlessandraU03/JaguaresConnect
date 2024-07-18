import React, { useState, useRef, useEffect } from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function StudentCard({ alumno, onDeleteClick }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const confirmDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar al alumno ${alumno.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(alumno.id); // Llamar a la función onDeleteClick con el ID del alumno
        Swal.fire(
          '¡Eliminado!',
          `El alumno ${alumno.nombre} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center p-4 border rounded-md shadow-md">
      <Image src="url_to_student_image" alt={alumno.nombre} />
      <h2 className="mt-2 text-lg font-semibold">{alumno.nombre} {alumno.apellido}</h2>
      <Text className="text-gray-500">Matricula: {alumno.id}</Text>
      <Text className="text-gray-500">Cinta: {alumno.cinta}</Text>
      <Text className="text-gray-500">Matrícula: {alumno.id}</Text>
      <Text className="text-gray-500">Horario: {alumno.horario}</Text>
      <div className="absolute bottom-2 right-2">
        <Button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-900"
        >
          <FontAwesomeIcon icon={faEllipsisV} className="h-6 w-6" />
        </Button>

        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              <Link to={`/alumno/${alumno.id}/view`}
               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Ver
              </Link>
              <Link to={`/alumno/${alumno.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Editar
              </Link>
              <Button onClick={confirmDelete} className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentCard;
