// src/components/organisms/HeaderAlumnos.js
import React, { useState, useEffect, useRef } from 'react';
import Logo from "../../atoms/Logo";
import LoginButton from "../../atoms/LoginButton";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from 'react-bootstrap';

function HeaderAlumnos() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center relative">
      <Logo />
      <div className="hidden md:flex">
        <nav className="flex space-x-4 text-xl relative">
          <Link to="/EquiposAlumno" className="hover:text-gray-300">Equipos</Link>
          <Link to="/EventosAlumnos" className="hover:text-gray-300">Eventos</Link>
          <Link to="/ExamenesAlumno" className="hover:text-gray-300">Exámenes</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-3">
        <LoginButton className="hidden md:block" />
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
