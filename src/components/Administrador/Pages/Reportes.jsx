import React, { useState } from 'react';
import HeaderAdmi from '../organisms/HeaderAdmi';
import SearchBar from '../../molecules/SearchBar';
import ReportesTabla from '../organisms/ReportesTabla';


function Reportes() {

  const [searchTerm, setSearchTerm] = useState('');


  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar Reportes" onSearch={setSearchTerm} />


      </main>
      <ReportesTabla searchTerm={searchTerm}/>
    </div>
    </>
  );
}

export default Reportes;
