import HeaderAdmi from "../components/organisms/HeaderAdmi";
import SearchBar from "../components/molecules/SearchBar";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Reportes() {
  const navigate = useNavigate()
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
