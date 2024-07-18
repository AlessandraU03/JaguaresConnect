import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import InstructorList from '../components/organisms/InstructorList';
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import Button from '../components/atoms/Button';
import SearchBar from '../components/molecules/SearchBar';

function Instructores() {
  const navigate = useNavigate()
    const handleClick = (e)=> {
        navigate("/formInstructor")
    }
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar instructores" onSearch={setSearchTerm} />
        <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Instructor
          </Button>

      </main>
      <InstructorList searchTerm={searchTerm}/>
    </div>
    </>
  );
}

export default Instructores;
