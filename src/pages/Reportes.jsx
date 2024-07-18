import HeaderAdmi from "../components/organisms/HeaderAdmi";
import SearchBar from "../components/molecules/SearchBar";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Reportes() {
  return (
    <div className="min-h-screen bg-gray-100">
    <HeaderAdmi />
    <main className="p-4 sm:p-8">
    <div className="flex justify-between items-center">
<SearchBar placeholder="Buscar reporte" />
<button
          className="ml-4 px-4 py-2 bg-[#8E9FA7] text-[#1B3140] rounded flex items-center"
          
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Agregar Reporte
        </button>
        </div>
</main>
</div>
  );
}

export default Reportes;
