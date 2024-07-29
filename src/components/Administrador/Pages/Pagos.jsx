import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import HeaderAdmi from '../organisms/HeaderAdmi';
import Button from '../atoms/Button';
import SearchBar from '../../General/molecules/SearchBar';
import PagosTabla from '../organisms/PagosTabla';
import PagosCard from '../molecules/PagosCard';

function Pagos() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const tipo = new URLSearchParams(location.search).get('tipo');
    setShowTable(tipo === 'realizados' || tipo === 'pendientes');
  }, [location]);

  const handleClick = () => {
    navigate("/RegistrarPago");
  };

  return (
    <>
      <HeaderAdmi />
      <div className="p-4 max-w-full mx-auto">
        <main className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <SearchBar placeholder="Buscar Pagos" onSearch={setSearchTerm} className="flex-1" />
          <Button
            className="mt-4 md:mt-0 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Pago
          </Button>
        </main>
        <div className="mt-4">
          {!showTable ? <PagosCard /> : <PagosTabla searchTerm={searchTerm} />}
        </div>
      </div>
    </>
  );
}

export default Pagos;
