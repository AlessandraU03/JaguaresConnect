import React, { useState, useEffect, useRef } from 'react';
import Logo from "../atoms/Logo";
import LoginButton from "../atoms/LoginButton"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from 'react-bootstrap';

function HeaderAdmi() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      <div className="hidden md:block">
        <nav className="md:flex md:flex-row space-x-4 text-xl relative">
          <DropdownButton ref={dropdownRef} id="dropdown-basic-button" title="Alumnos" className="relative z-10">
            <Dropdown.Item href="/Alumnos" className="block px-2 py-2 w-32 text-white bg-black">Inscritos</Dropdown.Item>
            <Dropdown.Item href="/Pagos" className="block py-2 px-2 text-white bg-black">Pagos</Dropdown.Item>
            <Dropdown.Item href="/Eventos" className="block py-2 px-2 text-white bg-black">Eventos</Dropdown.Item>
            <Dropdown.Item href="/Pedidos" className="block py-2 px-2 text-white bg-black">Pedidos</Dropdown.Item>
            <Dropdown.Item href="/Asistencia" className="block py-2 px-2 text-white bg-black">Asistencia</Dropdown.Item>
          </DropdownButton>
          <Link to="/Equipos">Equipos</Link>
          <Link to="/Anuncios">Anuncios</Link>
          <Link to="/Reportes">Reportes</Link>
          <Link to="/Examenes">Examen</Link>
          <Link to="/Instructores">Instructores</Link>
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
        <div className="fixed top-20 left-0 w-full bg-black p-4 md:hidden flex flex-col space-y-4 z-50">
          <Link to="/Alumnos">Alumnos</Link>
          <Link to="/Equipos">Equipos</Link>
          <Link to="/Anuncios">Anuncios</Link>
          <Link to="/Reportes">Reportes</Link>
          <Link to="/Examenes">Examen</Link>
          <Link to="/Eventos">Eventos</Link>
          <Link to="/Pagos">Pagos</Link>
          <Link to="/Asistencia">Asistencia</Link>
          <Link to="/Pedidos">Pedidos</Link>
        </div>
      )}
    </header>
  );
}

export default HeaderAdmi;
