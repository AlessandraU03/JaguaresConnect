import React, { useState, useEffect } from 'react';
import HeaderAlumnos from '../organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from '../../molecules/FormField';
import Swal from 'sweetalert2';
import TestTable from '../../molecules/TestTable';
import { useNavigate, useParams } from 'react-router-dom';

function ExamenDetailAlumno() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = sessionStorage.getItem('authToken');
  const [examen, setExamen] = useState(null);
  const [idalumno, setIdalumno] = useState('');
  const [nombrealumno, setNombrealumno] = useState('');
  const [apellidoalumno, setApellidoalumno] = useState('');
  const [nombreprofesor, setNombreprofesor] = useState('');
  const [apellidoprofesor, setApellidoprofesor] = useState('');
  const [nombreexaminador, setNombreexaminador] = useState('');
  const [apellidoexaminador, setApellidoexaminador] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [aprobado, setAprobado] = useState(false);

  const [doyang, setDoyang] = useState('');
  const [cinta, setCinta] = useState('');
  const [edad, setEdad] = useState('');
  const [fecha, setFecha] = useState('');
  const [grado, setGrado] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechainicio, setFechainicio] = useState('');
  
  // Campos de pruebas
  const [basico_concentracion, setBasico_concentracion] = useState('');
  const [basico_coordinacion, setBasico_coordinacion] = useState('');
  const [basico_agilidad, setBasico_agilidad] = useState('');
  const [basico_fuerza, setBasico_fuerza] = useState('');
  const [pateo_tecnica, setPateo_tecnica] = useState('');
  const [pateo_fuerza, setPateo_fuerza] = useState('');
  const [pateo_altura, setPateo_altura] = useState('');
  const [pateo_velocidad, setPateo_velocidad] = useState('');
  const [forma_concentracion, setForma_concentracion] = useState('');
  const [forma_equilibrio, setForma_equilibrio] = useState('');
  const [forma_sincronizacion, setForma_sincronizacion] = useState('');
  const [forma_fuerza, setForma_fuerza] = useState('');
  const [combatelibre_velocidad, setCombatelibre_velocidad] = useState('');
  const [combatelibre_variedad, setCombatelibre_variedad] = useState('');
  const [combatelibre_coordinacion, setCombatelibre_coordinacion] = useState('');
  const [rompimiento_tabla_agilidad, setRompimiento_tabla_agilidad] = useState('');
  const [rompimiento_tabla_creatividad, setRompimiento_tabla_creatividad] = useState('');
  const [rompimiento_tabla_fuerza, setRompimiento_tabla_fuerza] = useState('');
  const [pasoscombate_coordinacion, setPasoscombate_coordinacion] = useState('');
  const [pasoscombate_agilidad, setPasoscombate_agilidad] = useState('');
  const [pasoscombate_fuerza, setPasoscombate_fuerza] = useState('');
  const [defensapersonal_coordinacion, setDefensapersonal_coordinacion] = useState('');
  const [defensapersonal_agilidad, setDefensapersonal_agilidad] = useState('');
  const [defensapersonal_fuerza, setDefensapersonal_fuerza] = useState('');

  useEffect(() => {
    console.log(idalumno)
    if (idalumno)
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${idalumno}`,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token
      }
  })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        console.log(data); 
        if (data && data.nombre) {
          setNombrealumno(data.nombre);
          setApellidoalumno(data.apellido);
          setCinta(data.cinta);
          setEdad(data.edad);
          setNacimiento(formatDate(data.nacimiento));
          setFechainicio(formatDate(data.fechainicio));
          setTelefono(data.telefono);
        } else {
          throw new Error('Datos del alumno no están completos');
        }
      })
      
  },[idalumno]);


  useEffect(() => {
    fetch(`https://jaguaresconnectapi.integrador.xyz/api/examenes/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': token
      }
    })
      .then(response => response.json())
      .then(data => {
        setExamen(data);
        setIdalumno(data.idalumno || '');
        setNombrealumno(data.nombrealumno || '');
        setApellidoalumno(data.apellidoalumno || '');
        setNombreprofesor(data.nombreprofesor || '');
        setApellidoprofesor(data.apellidoprofesor || '');
        setNombreexaminador(data.nombreexaminador || '');
        setApellidoexaminador(data.apellidoexaminador || '');
        setCalificacion(data.calificacion || '');
        setAprobado(data.aprobado === 1);
        setDoyang(data.doyang || '');
        setCinta(data.cinta || '');
        setEdad(data.edad || '');
        setFecha(formatDate(data.fecha) || '');
        setGrado(data.grado || '');
        setNacimiento(formatDate(data.nacimiento) || '');
        setTelefono(data.telefono || '');
        setFechainicio(formatDate(data.fechainicio) || '');
        // Campos de pruebas
        setBasico_concentracion(data.basico_concentracion || '');
        setBasico_coordinacion(data.basico_coordinacion || '');
        setBasico_agilidad(data.basico_agilidad || '');
        setBasico_fuerza(data.basico_fuerza || '');
        setPateo_tecnica(data.pateo_tecnica || '');
        setPateo_fuerza(data.pateo_fuerza || '');
        setPateo_altura(data.pateo_altura || '');
        setPateo_velocidad(data.pateo_velocidad || '');
        setForma_concentracion(data.forma_concentracion || '');
        setForma_equilibrio(data.forma_equilibrio || '');
        setForma_sincronizacion(data.forma_sincronizacion || '');
        setForma_fuerza(data.forma_fuerza || '');
        setCombatelibre_velocidad(data.combatelibre_velocidad || '');
        setCombatelibre_variedad(data.combatelibre_variedad || '');
        setCombatelibre_coordinacion(data.combatelibre_coordinacion || '');
        setRompimiento_tabla_agilidad(data.rompimiento_tabla_agilidad || '');
        setRompimiento_tabla_creatividad(data.rompimiento_tabla_creatividad || '');
        setRompimiento_tabla_fuerza(data.rompimiento_tabla_fuerza || '');
        setPasoscombate_coordinacion(data.pasoscombate_coordinacion || '');
        setPasoscombate_agilidad(data.pasoscombate_agilidad || '');
        setPasoscombate_fuerza(data.pasoscombate_fuerza || '');
        setDefensapersonal_coordinacion(data.defensapersonal_coordinacion || '');
        setDefensapersonal_agilidad(data.defensapersonal_agilidad || '');
        setDefensapersonal_fuerza(data.defensapersonal_fuerza || '');
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo obtener los datos del examen', 'error');
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  
  const handleClick = () => {
    navigate("/ExamenesAlumno");
  };


  return (
    <>
      <HeaderAlumnos/>
      <div className="container mx-auto p-4">
      <h1 className="text-center text-[#002033] text-2xl font-bold mb-10">
          "Detalles del Examen"
        </h1>
  
  <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="col-span-1 md:col-span-3 bg-slate-400 border rounded-lg border-slate-400/50 p-4">
      <form className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3 p-2">
          <FormField label="ID Alumno" type="text" id="idalumno" value={idalumno} readOnly />
          <FormField label="Nombre del Alumno" type="text" id="nombrealumno" value={nombrealumno} readOnly />
          <FormField label="Apellido del Alumno" type="text" id="apellidoalumno" value={apellidoalumno} readOnly />
          <FormField label="Grado Actual" type="text" id="cinta" value={cinta} readOnly />
          <FormField label="Grado a Subir" type="text" id="grado" value={grado} readOnly />
          </div>
        <div className="w-full md:w-1/3 p-2">
          <FormField label="Edad" type="text" id="edad" value={edad} readOnly />
          <FormField label="Fecha de Nacimiento" type="date" id="nacimiento" value={nacimiento} readOnly />
          <FormField label="Teléfono" type="text" id="telefono" value={telefono} readOnly />
          <FormField label="Fecha de Ingreso" type="date" id="fechainicio" value={fechainicio} readOnly />
          <FormField label="Doyang" type="text" id="doyang" value={doyang} readOnly />
        </div>
        <div className="w-full md:w-1/3 p-2">
           <FormField label="Fecha del Examen" type="date" id="fecha" value={fecha} readOnly />
           <FormField label="Nombre del Profesor" type="text" id="nombreprofesor" value={nombreprofesor} readOnly />
            <FormField label="Apellido del Profesor" type="text" id="apellidoprofesor" value={apellidoprofesor} readOnly />
            <FormField label="Nombre del Examinador" type="text" id="nombreexaminador" value={nombreexaminador} readOnly />
          <FormField label="Apellido del Examinador" type="text" id="apellidoexaminador" value={apellidoexaminador} readOnly />
      </div>
      </form>
    </div>
  </div>

  {/* Tablas de pruebas */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
    <div className="col-span-1">
      
        <div className="col-span-1">
      <TestTable
        label="Basico"
        fields={[
          { id: 'basico_concentracion', label: 'Concentración', value: basico_concentracion },
          { id: 'basico_coordinacion', label: 'Coordinación', value: basico_coordinacion },
          { id: 'basico_agilidad', label: 'Agilidad', value: basico_agilidad },
          { id: 'basico_fuerza', label: 'Fuerza', value: basico_fuerza }
        ]}
      />
    </div>
     </div>


    <div className="col-span-1">
      
      <TestTable
        label="Pateo"
        fields={[
          { id: 'pateo_tecnica', label: 'Técnica', value: pateo_tecnica },
          { id: 'pateo_fuerza', label: 'Fuerza', value: pateo_fuerza },
          { id: 'pateo_altura', label: 'Altura', value: pateo_altura },
          { id: 'pateo_velocidad', label: 'Velocidad', value: pateo_velocidad }
        ]}
      />
    </div>

    <div className="col-span-1">

      <TestTable
        label="Forma"
        fields={[
          { id: 'forma_concentracion', label: 'Concentración', value: forma_concentracion },
          { id: 'forma_equilibrio', label: 'Equilibrio', value: forma_equilibrio },
          { id: 'forma_sincronizacion', label: 'Sincronización', value: forma_sincronizacion },
          { id: 'forma_fuerza', label: 'Fuerza', value: forma_fuerza }
        ]}
      />
  
    </div>

    <div className="col-span-1">
     
      <TestTable
        label="Combate Libre"
        fields={[
          { id: 'combatelibre_velocidad', label: 'Velocidad', value: combatelibre_velocidad },
          { id: 'combatelibre_variedad', label: 'Variedad', value: combatelibre_variedad },
          { id: 'combatelibre_coordinacion', label: 'Coordinación', value: combatelibre_coordinacion }
        ]}
      />
  
    </div>

    <div className="col-span-1">
      
        <TestTable
        label="Rompimiento de Tabla"
        fields={[
          { id: 'rompimiento_tabla_agilidad', label: 'Agilidad', value: rompimiento_tabla_agilidad },
          { id: 'rompimiento_tabla_creatividad', label: 'Creatividad', value: rompimiento_tabla_creatividad },
          { id: 'rompimiento_tabla_fuerza', label: 'Fuerza', value: rompimiento_tabla_fuerza }
        ]}
      />
    
      
    </div>

    <div className="col-span-1">
     
        <TestTable
        label="Pasos de Combate"
        fields={[
          { id: 'pasoscombate_coordinacion', label: 'Coordinación', value: pasoscombate_coordinacion },
          { id: 'pasoscombate_agilidad', label: 'Agilidad', value: pasoscombate_agilidad },
          { id: 'pasoscombate_fuerza', label: 'Fuerza', value: pasoscombate_fuerza }
        ]}
      />
    

    </div>
    <div className="col-span-1">
      
        <TestTable
        label="Defensa Personal"
        fields={[
          { id: 'defensapersonal_coordinacion', label: 'Coordinación', value: defensapersonal_coordinacion },
          { id: 'defensapersonal_agilidad', label: 'Agilidad', value: defensapersonal_agilidad },
          { id: 'defensapersonal_fuerza', label: 'Fuerza', value: defensapersonal_fuerza }
        ]}
      />
    
    </div>
    <div className="col-span-1 w-full md:w-2/3 p-2 mx-auto flex justify-center items-center">
  
    <div className="col-span-1 w-full md:w-2/3 p-2 mx-auto flex justify-center items-center">
    <div className="col-span-1 w-full md:w-2/3 p-2 mx-auto flex justify-center items-center">
    <FormField label="Calificación" type="text" id="calificacion" value={calificacion} readOnly />
    </div>
        <div className="col-span-1 w-full md:w-2/3 p-2 mx-auto flex justify-center items-center">
        <FormField label="Aprobado" type="checkbox" id="aprobado" value={aprobado} readOnly />
        </div>
        </div>


</div>
<div className="col-span-1 flex items-center justify-center">

    <Button onClick={handleClick}>Salir</Button>


</div>

  
  </div>

 
</div>
</>
)
}

export default ExamenDetailAlumno;