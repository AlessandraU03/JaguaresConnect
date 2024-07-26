import HeaderAdmi from "../components/organisms/HeaderAdmi";
import SearchBar from "../components/molecules/SearchBar";
import SectionPedido from "../components/organisms/SectionPedido";

function Pedidos() {
  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar Pedidos" />

      </main>
      <SectionPedido/>
    </div>
    </>
  );
}


export default Pedidos;
