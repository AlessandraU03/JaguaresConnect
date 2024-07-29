import HeaderAdmi from '../organisms/HeaderAdmi';
import SearchBar from "../../molecules/SearchBar";
import SectionPedido from '../organisms/SectionPedido';
import React, { useState } from 'react';

function Pedidos() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
    
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar Pedido" onSearch={setSearchTerm} />

      </main>
      <SectionPedido searchTerm={searchTerm}/>
    </div>
    </>
  );
}


export default Pedidos;
