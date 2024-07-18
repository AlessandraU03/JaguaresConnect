import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import SearchBar from '../components/molecules/SearchBar';
import Button from '../components/atoms/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StudentList from '../components/organisms/StudentList';

function Alumnos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    navigate("/formAlumno");
  };
  
  return (
    <>
      <HeaderAdmi />
      <div className="p-4">
      <main className="flex flex-col md:flex-row justify-between items-center py-4">
      <SearchBar placeholder="Buscar estudiantes" onSearch={setSearchTerm} />

          <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Alumno
          </Button>
        </main>
        <StudentList searchTerm={searchTerm} />
    </div>
    </>
  );
}

export default Alumnos;
