import React, { useState, useEffect } from 'react';
import HeaderAdmi from '../Alumno/organisms/HeaderAlumnos';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Swal from 'sweetalert2';
import SearchBar from '../molecules/SearchBar';
import Form from '../molecules/TestTable';
import { useNavigate } from 'react-router-dom';
import FormTable from '../molecules/FormTable';

function FormExamen() {
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem('authToken');
  const [id, setId] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState('');
  const [idalumno, setIdalumno] = useState('');
  const [nombrealumno, setNombrealumno] = useState('');
  const [apellidoalumno, setApellidoalumno] = useState('');
  const [nombreprofesor, setNombreprofesor] = useState('');
  const [apellidoprofesor, setApellidoprofesor] = useState('');
  const [nombreexaminador, setNombreexaminador] = useState('');
  const [apellidoexaminador, setApellidoexaminador] = useState('');
  const [aprobado, setAprobado] = useState(false); // Cambiado a booleano
  const [fecha, setFecha] =  useState('')
  const [doyang, setDoyang] = useState('');
  const [cinta, setCinta] = useState('');
  const [edad, setEdad] = useState('');
  const [grado, setGrado] = useState('')
  const [nacimiento, setNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechainicio, setFechainicio] = useState('');
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

  const handleGetAlumno = () => {
    if (!idalumno) {
      Swal.fire('Error', 'Debe ingresar la matrícula del alumno', 'error');
      return;
    }

    fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${idalumno}`, {
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
        console.log(data); // Para inspeccionar los datos
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
      
      .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudo obtener los datos del alumno', 'error');
      });
  };


    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    };
  
  
    
    const handleClick = (e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Confirmar Registro',
        text: "¿Desea guardar el examen?",
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('https://jaguaresconnectapi.integrador.xyz/api/examenes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Authorization': token
            },
            body: JSON.stringify({
              "idalumno": idalumno,
              "nombrealumno": nombrealumno,
              "apellidoalumno": apellidoalumno,
              "nombreprofesor": nombreprofesor,
              "apellidoprofesor": apellidoprofesor,
              "nombreexaminador": nombreexaminador,
              "apellidoexaminador": apellidoexaminador,
              "aprobado": aprobado,
              "doyang": doyang,
              "fecha": fecha,
              "grado": grado,
              "basico_concentracion": basico_concentracion,
              "basico_coordinacion": basico_coordinacion ,
              "basico_agilidad": basico_agilidad,
              "basico_fuerza": basico_fuerza,
              "pateo_tecnica": pateo_tecnica,
              "pateo_fuerza": pateo_fuerza,
              "pateo_altura":pateo_altura,
              "pateo_velocidad": pateo_velocidad,
              "forma_concentracion": forma_concentracion,
              "forma_equilibrio":forma_equilibrio,
              "forma_sincronizacion": forma_sincronizacion,
              "forma_fuerza": forma_fuerza,
              "combatelibre_velocidad": combatelibre_velocidad,
              "combatelibre_variedad": combatelibre_variedad,
              "combatelibre_coordinacion": combatelibre_coordinacion,
              "rompimiento_tabla_agilidad": rompimiento_tabla_agilidad,
              "rompimiento_tabla_creatividad": rompimiento_tabla_creatividad,
              "rompimiento_tabla_fuerza": rompimiento_tabla_fuerza,
              "pasoscombate_coordinacion":pasoscombate_coordinacion,
              "pasoscombate_agilidad": pasoscombate_agilidad,
              "pasoscombate_fuerza": pasoscombate_fuerza,
              "defensapersonal_coordinacion": defensapersonal_coordinacion,
              "defensapersonal_agilidad":defensapersonal_agilidad,
              "defensapersonal_fuerza": defensapersonal_fuerza
            })
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              return response.text().then(text => { throw new Error(text); });
            }
          })
          
            .then(data => {
              Swal.fire('Registrado!', 'El examen ha sido registrado correctamente.', 'success');
              navigate('/Examenes');
            })
            .catch(error => {
              console.error('Error:', error);
              Swal.fire('Error', 'Ocurrió un error al publicar el equipos.', 'error');
            });
        } else if (result.isDenied) {
          Swal.fire('Guardado', 'El equipo ha sido guardado pero no publicado.', 'info');
        }
      });
    }
/* 
    const regex = /^(?:10|[1-9])$/;

    const handleBlur = (setter) => (e) => {
      const value = e.target.value;
      if (!regex.test(value)) {
        Swal.fire('Error', 'El valor debe ser un número del 1 al 10', 'error');
        setter('');
      } else {
        setter(value);
      }
    };
  
   */
    
  

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">
          Registro de alumno para Examen
        </h1>
        <div className=" flex justify-start">
                <Button onClick={handleGetAlumno}>
                  Buscar
                </Button>
                  </div>
        <div className="space-y-4 grid grid-cols-3 gap-4">
          <div className="col-span-3 bg-slate-500 p-4">
            <form  className='flex gap-4'>
              <div className="w-1/3 p-2">
              <FormField
                  type='text'
                  id='idalumno'
                  label='ID Alumno'
                  placeholder='Ingrese el ID del alumno'
                  value={idalumno}
                  onChange={(e) => setIdalumno(e.target.value)}
                />
                

                <FormField
                  label="Nombre del Alumno"
                  type="text"
                  id="nombrealumno"
                  value={nombrealumno}
                  readOnly
                />
                <FormField
                  label="Apellido del Alumno"
                  type="text"
                  id="apellidoalumno"
                  value={apellidoalumno}
                  readOnly
                 /> 
               <FormField
                  label="Grado Actual"
                  type="select"
                  id="cinta"
                  value={cinta}
                  readOnly
                  options={[
                    { label: '10° KUP', value: '10° KUP' },
                    { label: '9° KUP', value: '9° KUP' },
                    { label: '8° KUP', value: '8° KUP' },
                    { label: '7° KUP', value: '7° KUP' },
                    { label: '6° KUP', value: '6° KUP' },
                    { label: '5° KUP', value: '5° KUP' },
                    { label: '4° KUP', value: '4° KUP' },
                    { label: '3° KUP', value: '3° KUP' },
                    { label: '2° KUP', value: '2° KUP' },
                    { label: '1° KUP', value: '1° KUP' },
                    { label: '1° PUM', value: '1° PUM' },
                    { label: '2° PUM', value: '2° PUM' },
                    { label: '3° PUM', value: '3° PUM' },
                    { label: '1° DAN', value: '1° DAN' },
                    { label: '2° DAN', value: '2° DAN' },
                    { label: '3° DAN', value: '3° DAN' },
                    { label: '4° DAN', value: '4° DAN' },
                  ]}
                />
                <FormField
                  label="Grado a Subir"
                  type="select"
                  id="grado"
                  value={grado}
                  onChange={(e) => setGrado(e.target.value)}
                  placeholder="Ingrese el grado a subir"
                  options={[
                    { label: '10° KUP', value: '10° KUP' },
                    { label: '9° KUP', value: '9° KUP' },
                    { label: '8° KUP', value: '8° KUP' },
                    { label: '7° KUP', value: '7° KUP' },
                    { label: '6° KUP', value: '6° KUP' },
                    { label: '5° KUP', value: '5° KUP' },
                    { label: '4° KUP', value: '4° KUP' },
                    { label: '3° KUP', value: '3° KUP' },
                    { label: '2° KUP', value: '2° KUP' },
                    { label: '1° KUP', value: '1° KUP' },
                    { label: '1° PUM', value: '1° PUM' },
                    { label: '2° PUM', value: '2° PUM' },
                    { label: '3° PUM', value: '3° PUM' },
                    { label: '1° DAN', value: '1° DAN' },
                    { label: '2° DAN', value: '2° DAN' },
                    { label: '3° DAN', value: '3° DAN' },
                    { label: '4° DAN', value: '4° DAN' },
                  ]}
                />

              </div>
              <div className="w-1/3 p-2">
              <FormField
                  label="Edad"
                  type="number"
                  id="edad"
                  value={edad}
                  readOnly
                  />
              <FormField
                  label="Fecha de Nacimiento"
                  type="date"
                  id="nacimiento"
                  value={nacimiento}
                 readOnly
                  />

                  <FormField
                  label="Telefono"
                  type="text"
                  id="telefono"
                  value={telefono}
                  readOnly
                  />

                  <FormField
                  label="Fecha de Ingreso"
                  type="date"
                  id="fecha de ingreso"
                  value={fechainicio}
                  readOnly
                  />    

                <FormField
                  label="Do Yang"
                  type="text"
                  id="doyang"
                  value={doyang}
                  onChange={(e) => setDoyang(e.target.value)}
                  placeholder="Ingrese Do Yang"
                />
  

              </div>

              <div className="w-1/3 p-2">
              <FormField
                label="Fecha del Examen"
                  type="date"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              <FormField
                  label="Nombre del Profesor"
                  type="text"
                  id="nombreprrofesor"
                  value={nombreprofesor}
                  onChange={(e) => setNombreprofesor(e.target.value)}
                  placeholder="Ingrese el nombre del instructor"
                />
                <FormField
                  label="Apellido del Profesor"
                  type="text"
                  id="apellidoprofesor"
                  value={apellidoprofesor}
                  onChange={(e) => setApellidoprofesor(e.target.value)}
                  placeholder="Ingrese el apellido del instructor"
                />
                <FormField
                  label="Nombre del Examinador"
                  type="text"
                  id="nombreexaminador"
                  value={nombreexaminador}
                  onChange={(e) => setNombreexaminador(e.target.value)}
                  placeholder="Ingrese el nombre del instructor"
                />
                <FormField
                  label="Apellido del examinador"
                  type="text"
                  id="apellidoexaminador"
                  value={apellidoexaminador}
                  onChange={(e) => setApellidoexaminador(e.target.value)}
                  placeholder="Ingrese el apellido del instructor"
                />

              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
      <div className="space-y-8 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=" p-4 bg-slate-300 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Básico</h2>
            <FormTable
              label="Basico Concentración"
              type="number"
              id="basico_concentracion"
              value={basico_concentracion}
              onChange={(e) => setBasico_concentracion(e.target.value)}
            />
            <FormTable
              label="Basico Coordinación"
              type="number"
              id="basico_coordinacion"
              value={basico_coordinacion}
              onChange={(e) => setBasico_coordinacion(e.target.value)}
            />
            <FormTable
              label="Basico Agilidad "
              type="number"
              id="basico_agilidad"
              value={basico_agilidad}
              onChange={(e) => setBasico_agilidad(e.target.value)}
            />
            <FormTable
              label="Básico Fuerza"
              type="number"
              id="basico_fuerza"
              value={basico_fuerza}
              onChange={(e) => setBasico_fuerza(e.target.value)}
            />
          </div>

          <div className="p-4 bg-slate-300 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Pateo</h2>
            
            <FormTable
              label="Pateo Técnica"
              type="number"
              id="pateo_tecnica"
              value={pateo_tecnica}
              onChange={(e) => setPateo_tecnica(e.target.value)}
            />
            <FormTable
              label="Pateo Fuerza"
              type="number"
              id="pateo_fuerza"
              value={pateo_fuerza}
              onChange={(e) => setPateo_fuerza(e.target.value)}
            />
            <FormTable
              label="Pateo Altura"
              type="number"
              id="pateo_altura"
              value={pateo_altura}
              onChange={(e) => setPateo_altura(e.target.value)}
            />
            <FormTable
              label="Pateo Velocidad"
              type="number"
              id="pateo_velocidad"
              value={pateo_velocidad}
              onChange={(e) => setPateo_velocidad(e.target.value)}
            />
          </div>

          <div className="p-4 bg-slate-300 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Forma</h2>
            
            <FormTable
              label="Forma Concentración"
              type="number"
              id="forma_concentracion"
              value={forma_concentracion}
              onChange={(e) => setForma_concentracion(e.target.value)}
            />
            <FormTable
              label="Forma Equilibrio"
              type="number"
              id="forma_equilibrio"
              value={forma_equilibrio}
              onChange={(e) => setForma_equilibrio(e.target.value)}
            />
            <FormTable
              label="Forma Sincronización"
              type="number"
              id="forma_sincronizacion"
              value={forma_sincronizacion}
              onChange={(e) => setForma_sincronizacion(e.target.value)}
            />
            <FormTable
              label="Forma Fuerza"
              type="number"
              id="forma_fuerza"
              value={forma_fuerza}
              onChange={(e) => setForma_fuerza(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-300 p-4 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Combate Libre</h2>
            <FormTable
              label="Combate Libre Velocidad"
              type="number"
              id="combatelibre_velocidad"
              value={combatelibre_velocidad}
              onChange={(e) => setCombatelibre_velocidad(e.target.value)}
            />
            <FormTable
              label="Combate Libre Variedad"
              type="number"
              id="combatelibre_variedad"
              value={combatelibre_variedad}
              onChange={(e) => setCombatelibre_variedad(e.target.value)}
            />
            <FormTable
              label="Combate Libre Coordinación"
              type="number"
              id="combatelibre_coordinacion"
              value={combatelibre_coordinacion}
              onChange={(e) => setCombatelibre_coordinacion(e.target.value)}
            />
          </div>

          <div className="p-4 bg-slate-300 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Rompimiento de Tabla</h2>
            <FormTable
              label="Rompimiento Tabla Agilidad"
              type="number"
              id="rompimiento_tabla_agilidad"
              value={rompimiento_tabla_agilidad}
              onChange={(e) => setRompimiento_tabla_agilidad(e.target.value)}
            />
            <FormTable
              label="Rompimiento Tabla Creatividad"
              type="number"
              id="rompimiento_tabla_creatividad"
              value={rompimiento_tabla_creatividad}
              onChange={(e) => setRompimiento_tabla_creatividad(e.target.value)}
            />
            <FormTable
              label="Rompimiento Tabla Fuerza"
              type="number"
              id="rompimiento_tabla_fuerza"
              value={rompimiento_tabla_fuerza}
              onChange={(e) => setRompimiento_tabla_fuerza(e.target.value)}
            />
          </div>

          <div className="p-4 bg-slate-300 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Pasos de Combate</h2>
            <FormTable
              label="Pasos Combate Coordinación"
              type="number"
              id="pasoscombate_coordinacion"
              value={pasoscombate_coordinacion}
              onChange={(e) => setPasoscombate_coordinacion(e.target.value)}
            />
            <FormTable
              label="Pasos Combate Agilidad"
              type="number"
              id="pasoscombate_agilidad"
              value={pasoscombate_agilidad}
              onChange={(e) => setPasoscombate_agilidad(e.target.value)}
            />
            <FormTable
              label="Pasos Combate Fuerza"
              type="number"
              id="pasoscombate_fuerza"
              value={pasoscombate_fuerza}
              onChange={(e) => setPasoscombate_fuerza(e.target.value)}
            />
          </div>

          <div className="bg-slate-300 p-4 rounded-md flex flex-col items-center w-full h-full">
            <h2 className="font-bold text-center mb-4">Defensa Personal</h2>
            <FormTable
              label="Defensa Personal Coordinación"
              type="number"
              id="defensapersonal_coordinacion"
              value={defensapersonal_coordinacion}
              onChange={(e) => setDefensapersonal_coordinacion(e.target.value)}
            />
            <FormTable
              label="Defensa Personal Agilidad"
              type="number"
              id="defensapersonal_agilidad"
              value={defensapersonal_agilidad}
              onChange={(e) => setDefensapersonal_agilidad(e.target.value)}
            />
            <FormTable
              label="Defensa Personal Fuerza"
              type="number"
              id="defensapersonal_fuerza"
              value={defensapersonal_fuerza}
              onChange={(e) => setDefensapersonal_fuerza(e.target.value)}
            />
          </div>
          <div className="col-span-1 w-full md:w-2/3 p-2 mx-auto flex justify-center items-center">
          <FormField label="Aprobado" type="checkbox" id="aprobado" value={aprobado} onChange={(e) => setAprobado(e.target.checked)} />
        </div>  
          <div className="flex justify-center items-center mt-8">
          <Button onClick={handleClick}>Guardar Examen</Button>
        </div>

        </div>

        
      </div>
    </div>
    </div>

    </>
  );
}  

export default FormExamen;
