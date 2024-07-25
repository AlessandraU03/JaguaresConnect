import HeaderAdmi from "../components/organisms/HeaderAdmi";
import SearchBar from "../components/molecules/SearchBar";
import SectionPedido from "../components/organisms/SectionPedido";
import { useState } from "react";

function Pedidos() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar pedidos" onSearch={setSearchTerm} />


      </main>
      <SectionPedido searchTerm={searchTerm}/>
    </div>
    </>
  );
}


export default Pedidos;
