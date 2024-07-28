import React, { useState } from 'react';
import SearchBar from '../../molecules/SearchBar';
import Button from '../atoms/Button';
import HeaderAdmi from '../organisms/HeaderAdmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Sectioneventos from '../organisms/SectionEventos';

function Eventos()  {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');
  const handleClick = ()=> {
      navigate("/RegistrarEvento")
  }

  return (
    <>
    <HeaderAdmi />
        <div className="p-4">
          <main className="flex flex-col md:flex-row justify-between items-center py-4">
          <SearchBar placeholder="Buscar Evento" onSearch={setSearchTerm} />
          <Button
            className="ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Evento
          </Button>
        </main>
        <Sectioneventos searchTerm={searchTerm}/>
      </div>
    </>
  );
};

export default Eventos;
