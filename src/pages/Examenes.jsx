import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import Button from '../components/atoms/Button';
import SearchBar from '../components/molecules/SearchBar';
import SectionExamen from '../components/organisms/SectionExamen';

function Examenes() {
  const navigate = useNavigate()
    const handleClick = (e)=> {
        navigate("/RegistrarExamen")
    }
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar Examen" onSearch={setSearchTerm} />
        <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Examen
          </Button>

      </main>
      <SectionExamen searchTerm={searchTerm}/>
    </div>
    </>
  );
}

export default Examenes;
