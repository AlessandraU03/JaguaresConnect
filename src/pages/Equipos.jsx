import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import SearchBar from '../components/molecules/SearchBar';
import SectionEquipos from '../components/organisms/SectionEquipos';
import Button from '../components/atoms/Button';

function Equipos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list');

  const handleClick = () => {
    navigate("/formEquipo");
  };

  return (
    <>
      <HeaderAdmi />
      <div className="p-4">
        {view === 'list' && (
          <main className="flex flex-col md:flex-row justify-between items-center py-4">
            <SearchBar placeholder="Buscar equipos" onSearch={setSearchTerm} />           
            <Button
              className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Agregar Equipo
            </Button>
          </main>
        )}
        <SectionEquipos searchTerm={searchTerm} view={view} setView={setView} />
      </div>
    </>
  );
}

export default Equipos;
