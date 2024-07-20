import HeaderAdmi from "../components/organisms/HeaderAdmi";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/atoms/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from "../components/molecules/SearchBar";
import PedidosCard from "../components/molecules/PedidosCard";
import SectionPedido from "../components/organisms/SectionPedido";

function Pedidos() {
  return (
    <>
    <HeaderAdmi></HeaderAdmi>
    <div className="p-4">
      <main className="flex justify-between items-center py-4">
      <SearchBar placeholder="Buscar instructores" />
        <Button
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
            
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Agregar Instructor
          </Button>

      </main>
      <SectionPedido/>
    </div>
    </>
  );
}


export default Pedidos;
