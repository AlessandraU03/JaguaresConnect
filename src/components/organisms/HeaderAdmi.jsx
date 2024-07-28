import React, { useState, useEffect, useRef } from 'react';
import Logo from "../atoms/Logo";
import LoginButton from "../atoms/LoginButton";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from 'react-bootstrap';

function HeaderAdmi() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }
  };
  const handleLogo = () => {
    navigate("/Administrador");
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
      <div className="hidden md:block">
        <nav className="md:flex md:flex-row space-x-4 text-xl relative">
          <DropdownButton ref={dropdownRef} id="dropdown-basic-button" title="Alumnos" className="relative z-10">
            <Dropdown.Item as={Link} to="/Alumnos" className="block px-2 py-2 w-32 text-white bg-black">
              Inscritos
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/Pagos" className="block py-2 px-2 text-white bg-black">
              Pagos
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/Eventos" className="block py-2 px-2 text-white bg-black">
              Eventos
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/Pedidos" className="block py-2 px-2 text-white bg-black">
              Pedidos
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/Asistencia" className="block py-2 px-2 text-white bg-black">
              Asistencia
            </Dropdown.Item>
          </DropdownButton>
          <Link to="/Equipos">Equipos</Link>
          <Link to="/Anuncios">Anuncios</Link>
          <Link to="/Reportes">Reportes</Link>
          <Link to="/Examenes">Examen</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative hidden md:block">
          <LoginButton onClick={toggleDropdown} />
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-black text-white rounded-md shadow-lg z-50">
              <Link to="/perfil" className="block px-4 py-2">
                Perfil
              </Link>
              <Link to="/logout" className="block px-4 py-2">
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <Button onClick={toggleMenu} className="text-white">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-20 left-0 w-full bg-black p-4 md:hidden flex flex-col space-y-4 z-50" ref={menuRef}>
          <Link to="/Alumnos" className="text-white text-lg">Alumnos</Link>
          <Link to="/Equipos" className="text-white text-lg">Equipos</Link>
          <Link to="/Anuncios" className="text-white text-lg">Anuncios</Link>
          <Link to="/Reportes" className="text-white text-lg">Reportes</Link>
          <Link to="/Examenes" className="text-white text-lg">Exámenes</Link>
          <Link to="/Eventos" className="text-white text-lg">Eventos</Link>
          <Link to="/Pagos" className="text-white text-lg">Pagos</Link>
          <Link to="/Asistencia" className="text-white text-lg">Asistencia</Link>
          <Link to="/Pedidos" className="text-white text-lg">Pedidos</Link>
        </div>
      )}
    </header>
  );
}

export default HeaderAdmi;
