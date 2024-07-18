
import { Link, useNavigate } from "react-router-dom";
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';

function SectionLogin({
  matricula,
  contraseña,
  handleChange,
  handleSubmit,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate("/Administrador");
  };

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-auto">

      <div className="p-6 rounded shadow-md bg-white  max-w w-full md:w-96">

      <div className="p-2 flex items-center">
  <Logo/> 
  <h2 className="text-2xl font-bold ml-4">Iniciar sesión</h2>
</div>

        
        <FormField
          label="Matricula:"
          type="text"
          id="matricula"
          value={matricula}
          placeholder="Ingrese la matricula"
          onChange={handleChange}
        />
        <FormField
          label="Contraseña"
          type="password" // Cambiado a password para ocultar la contraseña
          id="contraseña"
          placeholder="Ingrese la contraseña"
          value={contraseña}
          onChange={handleChange}
        />
              <div className="flex justify-center mt-4">
  <Button
    type="submit"
    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
    onClick={handleClick}
  >
    Iniciar Sesión
  </Button>
</div>

      </div>

    </form>
  );
}

export default SectionLogin;

