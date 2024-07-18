import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import HeaderAdmi from '../components/organisms/HeaderAdmi';
import Button from '../components/atoms/Button';
import SearchBar from '../components/molecules/SearchBar';
import PagosTabla from '../components/organisms/PagosTabla';
import PagosCard from '../components/molecules/PagosCard';

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
      <div className="p-4">
        <main className="flex justify-between items-center py-4">
          <SearchBar placeholder="Buscar Pagos" onSearch={setSearchTerm} />
          <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agrega Pago
          </Button>
        </main>
        {!showTable ? <PagosCard /> : <PagosTabla />}
      </div>
    </>
  );
}

export default Pagos;
