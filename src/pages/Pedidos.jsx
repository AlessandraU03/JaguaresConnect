import HeaderAdmi from '../components/organisms/HeaderAdmi';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from "../components/atoms/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from "../components/molecules/SearchBar";
import SectionPedido from "../components/organisms/SectionPedido"; 

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
