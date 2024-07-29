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
    <header className="h-[100px] md:h-[130px] container mx-auto bg-black text-white flex flex-col md:flex-row">
      <div className="flex justify-between items-center w-full md:w-3/12 px-10 py-4">
        <Logo />
        <h1 className="text-xl md:text-2xl m-0">IDEM Jaguares</h1>
      </div>
      <div className="flex justify-end items-center w-full md:w-9/12 px-10 py-4 text-lg md:text-2xl">
        <LoginButton text="Iniciar sesión" onClick={handleClick} />
      </div>
    </header>
  );
}

export default Navbar;
