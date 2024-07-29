// src/components/organisms/HeaderAlumnos.js
import React, { useState, useEffect, useRef } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from "../../atoms/Logo";
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from 'react-bootstrap';
import LoginI from '../atoms/LoginI';

function HeaderAlumnos() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };



  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogo = () => {
    navigate("/Alumno");
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center relative">
      <Logo onClick={handleLogo} />
      <div className="hidden md:flex">
        <nav className="flex space-x-4 text-xl relative">
          <Link to="/EquiposAlumno" className="hover:text-gray-300">Equipos</Link>
          <Link to="/EventosAlumnos" className="hover:text-gray-300">Eventos</Link>
          <Link to="/ExamenesAlumno" className="hover:text-gray-300">Exámenes</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-3">
  <DropdownButton
    ref={dropdownRef}
    id="dropdown-basic-button"
    title={<LoginI />}
  >
    <Dropdown.Item as={Link} to="/Perfil" className="block px-2 py-2 w-32 text-white bg-black">
      Perfil
    </Dropdown.Item>
    <Dropdown.Item 
      as="button" 
      onClick={handleLogout} 
      className="block py-2 px-2 text-white bg-black"
    >
      Cerrar Sesión
    </Dropdown.Item>
  </DropdownButton>
  
  <div className="md:hidden flex items-center">
    <Button onClick={toggleMenu} className="text-white">
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </Button>
  </div>
</div>

      {isOpen && (
        <div className="fixed top-20 left-0 w-full bg-black p-4 md:hidden flex flex-col space-y-4 z-50" ref={menuRef}>
          <Link to="/EquiposAlumno" className="text-white text-lg hover:text-gray-300">Equipos</Link>
          <Link to="/EventosAlumnos" className="text-white text-lg hover:text-gray-300">Eventos</Link>
          <Link to="/ExamenesAlumno" className="text-white text-lg hover:text-gray-300">Exámenes</Link>
        </div>
      )}
    </header>
  );
}

export default HeaderAlumnos;
