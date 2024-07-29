import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '/public/Images/Login.png';

function LoginButton({ onClick }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <button
      onClick={() => {
        handleLogin();
        onClick();
      }}
    >
      <img
        src={LoginIcon}
        alt="Icono de Iniciar Sesión"
        className="h-10 sm:h-18 md:h-10 lg:h-18 xl:h-20 2xl:h-14 w-auto"
      />
    </button>
  );
}

export default LoginButton;
