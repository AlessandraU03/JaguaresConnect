import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';
import LoginButton from '../atoms/LoginButton';
import './Navbar.css';

const NavbarTitle = styled.h1`
  font-size: 32px;
  margin: 0;
`;

function Navbar() {

  const navigate = useNavigate()
  const handleClick = (e)=> {
      navigate("/login")
  }


  return (
    <header className='h-[130px] container mx-auto bg-black text-white flex '>
      <div id='logo'>
        <Logo />
        <NavbarTitle>IDEM Jaguares</NavbarTitle>
      </div>
      <div id='loginB'>
        <LoginButton text="Iniciar sesión" onClick={handleClick} />
      </div>
    </header>
  );
}

export default Navbar;
