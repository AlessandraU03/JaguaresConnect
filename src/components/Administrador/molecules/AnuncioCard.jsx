import React, { useState, useRef, useEffect } from "react";
import Button from "../atoms/Button";
import { Link } from 'react-router-dom';
import Text from "../atoms/Text";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; 
import Swal from "sweetalert2";

function AnuncioCard({ anuncio, onDeleteClick }) {
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
      text: `Vas a eliminar al anuncio ${anuncio.titulo}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(anuncio.id);
        Swal.fire(
          '¡Eliminado!',
          `El anuncio ${anuncio.titulo} ha sido eliminado.`,
          'success'
        );
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center p-4 border rounded-md shadow-md">
      <h2 className="mt-2 text-lg font-semibold">{anuncio.titulo}</h2>
      <Text className="text-gray-500">{anuncio.descripcion}</Text>
      <Text className="text-gray-500">{new Date(anuncio.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
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
              <Link to={`/anuncios/${anuncio.id}/view`}
               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Ver
              </Link>
              <Link to={`/anuncios/${anuncio.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
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

export default AnuncioCard;
