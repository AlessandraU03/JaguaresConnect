import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import LoginButton from '../atoms/LoginButton';

function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <header className="bg-black text-white flex flex-col sm:flex-row items-center justify-between p-4">
      <div className="flex items-center mb-2 sm:mb-0">
        <Logo />
        <h1 className="text-lg sm:text-xl md:text-2xl ml-2">IDEM Jaguares</h1>
      </div>
      <div className="flex justify-end items-end">
        <LoginButton text="Iniciar sesión" onClick={handleClick} />
      </div>
    </header>
  );
}

export default Navbar;
