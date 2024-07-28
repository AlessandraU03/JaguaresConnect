import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrashAlt, faEllipsisV, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import Button from "../atoms/Button";

function ListaCard({ lista, onDeleteClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

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
      text: `Vas a eliminar la lista de la semana ${lista.id}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteClick(lista.id);
        Swal.fire(
          '¡Eliminado!',
          `La lista de la semana ${lista.id} ha sido eliminada.`,
          'success'
        );
      }
    });
  };

  return (
    <div className="relative flex flex-col items-center p-4 border rounded-md shadow-md bg-white">
      <FontAwesomeIcon icon={faClipboardList} className="text-gray-700 h-48 w-44 mb-4" /> {/* Icono grande sin fondo negro */}
      <h2 className="text-lg font-semibold">Semana {lista.id}</h2>
      <Link to={`/lista/${lista.id}/asistencia`} className="mt-4">
        <Button>
          Tomar Asistencia
        </Button>
      </Link>
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
              <Link to={`/lista/${lista.id}/view`}
               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Ver
              </Link>
              <Link to={`/lista/${lista.id}/edit`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Editar
              </Link>
              <button onClick={confirmDelete} className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListaCard;
