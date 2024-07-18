// src/components/organisms/Header.js
import React from 'react';
import Navbar from '../molecules/Navbar';

function Header() {
  return (
    <header className='h-[130px] container mx-auto bg-black text-white flex '>
      <Navbar />
    </header>
  );
}

export default Header;
