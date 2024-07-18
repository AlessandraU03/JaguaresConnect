import React, { useState } from 'react';
import SearchBar from '../components/molecules/SearchBar';
import Button from '../components/atoms/Button';
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SectionEventos from '../components/organisms/SectionEventos';
function Eventos()  {
  const navigate = useNavigate()
  const handleClick = ()=> {
      navigate("/RegistrarEvento")
  }

  return (
    <>
    <HeaderAdmi />
        <div className="p-4">
          <main className="flex flex-col md:flex-row justify-between items-center py-4">
          <SearchBar placeholder="Buscar Evento" />
          <Button
            className="ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Evento
          </Button>
        </main>
        <SectionEventos/>
      </div>
    </>
  );
};

export default Eventos;
