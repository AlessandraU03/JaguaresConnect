import React, { useState } from 'react';
import SearchBarDate from '../components/molecules/SearchBarDate';
import Button from '../components/atoms/Button';
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import SectionAnuncios from '../components/organisms/SectionAnuncios';

function Anuncios() {
  const [searchTerm, setSearchTerm] = useState({ query: '', fecha: '' });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/formAnuncios");
  };

  const handleSearchChange = (searchValues) => {
    setSearchTerm(searchValues);
  };

  return (
    <>
      <HeaderAdmi />
      <div className="p-4">
        <main className="flex flex-col md:flex-row justify-between items-center py-4">
          <SearchBarDate placeholder="Buscar Anuncios" onSearch={handleSearchChange} />
          <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Anuncios
          </Button>
        </main>
        <SectionAnuncios searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default Anuncios;
