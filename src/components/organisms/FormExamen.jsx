import React, { useState, useEffect } from 'react';
import HeaderAdmi from './HeaderAdmi';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import Swal from 'sweetalert2';
import Form from '../molecules/Form';
import { useNavigate } from 'react-router-dom';

function FormExamen() {
  const navigate = useNavigate();
    const [id, setId] = useState('');
    const [cinta, setCinta]= useState('');
    const [edad, setEdad] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechainicio, setFechainicio] = useState('');
    const [idalumno, setIdalumno] = useState('');
    const [nombrealumno, setNombrealumno] = useState('');
    const [apellidoalumno, setApellidoalumno] = useState('');
    const [nombreinstructor, setNombreinstructor] = useState('');
    const [apellidoinstructor, setApellidoinstructor] = useState('');
    const [fecha, setFecha] = useState('');
    const [grado, setGrado] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [doyang, setDoyang] = useState('');
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
  
      fetch(`https://jaguaresconnectapi.integrador.xyz/api/alumnos/${idalumno}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la solicitud');
          }
        })
        .then(data => {
          setNombrealumno(data.nombre);
          setApellidoalumno(data.apellido);
          setNombreinstructor(data.tutor_nombre); // Verificar si es el nombre correcto de instructor
          setApellidoinstructor(data.tutor_apellido);
          setCinta(data.cinta);
          setEdad(data.edad);
          setNacimiento(formatDate(data.nacimiento));
          setFechainicio(formatDate(data.fechainicio));
          setTelefono(data.telefono);
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
        title: 'Confirmar publicación',
        text: "¿Desea subir el evento?",
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch('https://jaguaresconnectapi.integrador.xyz/api/examenes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              "nombrealumno": nombrealumno,
              "apellidoalumno": apellidoalumno,
              "nombreinstructor": nombreinstructor,
              "apellidoinstructor": apellidoinstructor,
              "cinta": cinta,
              "nacimiento":nacimiento,
              "fechainicio": fechainicio,
              "telefono": telefono,
              "edad": edad,
              "fecha": fecha,
              "grado": grado,
              "calificacion": calificacion,
              "doyang": doyang,
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
                throw new Error('Error en la solicitud');
              }
            })
            .then(data => {
              Swal.fire('Publicado!', 'El equipo ha sido publicado correctamente.', 'success');
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
  

  return (
    <>
      <HeaderAdmi />
      <div className="container mx-auto p-4">
        <h1 className="text-center text-[#002033] text-2xl font-bold mb-4">
          Registro de alumno para Examen
        </h1>
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
                <div className="mt-2 flex justify-end">
                <Button type='button' onClick={handleGetAlumno}>Buscar Alumno</Button>
                </div>

                <FormField
                  label="Nombre del Alumno"
                  type="text"
                  id="nombrealumno"
                  value={nombrealumno}
                  onChange={(e) => setNombrealumno(e.target.value)}
                  placeholder="Ingrese el nombre del alumno"
                />
                <FormField
                  label="Apellido del Alumno"
                  type="text"
                  id="apellidoalumno"
                  value={apellidoalumno}
                  onChange={(e) => setApellidoalumno(e.target.value)}
                  placeholder="Ingrese el apellido del alumno"
                /> 
               <FormField
                  label="Grado Actual"
                  type="select"
                  id="cinta"
                  value={cinta}
                  onChange={(e) => setCinta(e.target.value)}
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
                  onChange={(e) => setEdad(e.target.value)}
                  />
              <FormField
                  label="Fecha de Nacimiento"
                  type="date"
                  id="nacimiento"
                  value={nacimiento}
                  onChange={(e) => setNacimiento(e.target.value)}
                  />

                  <FormField
                  label="Telefono"
                  type="text"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  />

                  <FormField
                  label="Fecha de Ingreso"
                  type="date"
                  id="fecha de ingreso"
                  value={fechainicio}
                  onChange={(e) => setFechainicio(e.target.value)}
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
                label="Fecha"
                  type="date"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              <FormField
                  label="Nombre del Instructor"
                  type="text"
                  id="nombreinstructor"
                  value={nombreinstructor}
                  onChange={(e) => setNombreinstructor(e.target.value)}
                  placeholder="Ingrese el nombre del instructor"
                />
                <FormField
                  label="Apellido del Instructor"
                  type="text"
                  id="apellidoinstructor"
                  value={apellidoinstructor}
                  onChange={(e) => setApellidoinstructor(e.target.value)}
                  placeholder="Ingrese el apellido del instructor"
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
            </form>
          </div>
        </div>
  
        {/* Sección de Evaluaciones */}
        <div className="space-y-4 space-x-6 grid grid-cols-3 gap-4">
          <div className='bg-slate-400'>
            <h2 className="font-bold text-center">Básico</h2>
            <Form
                  label="Concentración"
                  type="text"
                  id="basico_concentracion"
                  value={basico_concentracion}
                  onChange={(e) => setBasico_concentracion(e.target.value)}
                  placeholder="Ingrese Básico Concentración"
                />
            <Form
                  label="Coordinación"
                  type="text"
                  id="basico_coordinacion"
                  value={basico_coordinacion}
                  onChange={(e) => setBasico_coordinacion(e.target.value)}
                  placeholder="Ingrese Básico Coordinación"
                />
            <Form
                  label="Agilidad"
                  type="text"
                  id="basico_agilidad"
                  value={basico_agilidad}
                  onChange={(e) => setBasico_agilidad(e.target.value)}
                  placeholder="Ingrese Básico Agilidad"
                />
          </div>
  
          <div>
            <h2 className="font-bold">Pateo</h2>
            <FormField
                  label="Básico Fuerza"
                  type="text"
                  id="basico_fuerza"
                  value={basico_fuerza}
                  onChange={(e) => setBasico_fuerza(e.target.value)}
                  placeholder="Ingrese Básico Fuerza"
                />
           <FormField
                  label="Pateo Técnica"
                  type="text"
                  id="pateo_tecnica"
                  value={pateo_tecnica}
                  onChange={(e) => setPateo_tecnica(e.target.value)}
                  placeholder="Ingrese Pateo Técnica"
                />
            <FormField
                  label="Pateo Fuerza"
                  type="text"
                  id="pateo_fuerza"
                  value={pateo_fuerza}
                  onChange={(e) => setPateo_fuerza(e.target.value)}
                  placeholder="Ingrese Pateo Fuerza"
                />
            <FormField
                  label="Pateo Altura"
                  type="text"
                  id="pateo_altura"
                  value={pateo_altura}
                  onChange={(e) => setPateo_altura(e.target.value)}
                  placeholder="Ingrese Pateo Altura"
                />
          </div>
  
          <div>
            <h2 className="font-bold">Forma</h2>
            <FormField
                  label="Pateo Velocidad"
                  type="text"
                  id="pateo_velocidad"
                  value={pateo_velocidad}
                  onChange={(e) => setPateo_velocidad(e.target.value)}
                  placeholder="Ingrese Pateo Velocidad"
                />
            <FormField
                  label="Forma Concentración"
                  type="text"
                  id="forma_concentracion"
                  value={forma_concentracion}
                  onChange={(e) => setForma_concentracion(e.target.value)}
                  placeholder="Ingrese Forma Concentración"
                />
            <FormField
                  label="Forma Equilibrio"
                  type="text"
                  id="forma_equilibrio"
                  value={forma_equilibrio}
                  onChange={(e) => setForma_equilibrio(e.target.value)}
                  placeholder="Ingrese Forma Equilibrio"
                />
            <FormField
                  label="Forma Sincronización"
                  type="text"
                  id="forma_sincronizacion"
                  value={forma_sincronizacion}
                  onChange={(e) => setForma_sincronizacion(e.target.value)}
                  placeholder="Ingrese Forma Sincronización"
                />
                <FormField
                  label="Forma Fuerza"
                  type="text"
                  id="forma_fuerza"
                  value={forma_fuerza}
                  onChange={(e) => setForma_fuerza(e.target.value)}
                  placeholder="Ingrese Forma Fuerza"
                />
          </div>
        </div>
  
        <div className="space-y-4 grid grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold">Combate Libre</h2>
            
            <FormField
                  label="Combate Libre Velocidad"
                  type="text"
                  id="combatelibre_velocidad"
                  value={combatelibre_velocidad}
                  onChange={(e) => setCombatelibre_velocidad(e.target.value)}
                  placeholder="Ingrese Combate Libre Velocidad"
                />
            <FormField
                  label="Combate Libre Variedad"
                  type="text"
                  id="combatelibre_variedad"
                  value={combatelibre_variedad}
                  onChange={(e) => setCombatelibre_variedad(e.target.value)}
                  placeholder="Ingrese Combate Libre Variedad"
                />
                <FormField
                  label="Combate Libre Coordinación"
                  type="text"
                  id="combatelibre_coordinacion"
                  value={combatelibre_coordinacion}
                  onChange={(e) => setCombatelibre_coordinacion(e.target.value)}
                  placeholder="Ingrese Combate Libre Coordinación"
                />
          </div>
  
          <div>
            <h2 className="font-bold">Rompimiento de Tabla</h2>
            <FormField
                  label="Rompimiento Tabla Agilidad"
                  type="text"
                  id="rompimiento_tabla_agilidad"
                  value={rompimiento_tabla_agilidad}
                  onChange={(e) => setRompimiento_tabla_agilidad(e.target.value)}
                  placeholder="Ingrese Rompimiento Tabla Agilidad"
                />
            <FormField
                  label="Rompimiento Tabla Creatividad"
                  type="text"
                  id="rompimiento_tabla_creatividad"
                  value={rompimiento_tabla_creatividad}
                  onChange={(e) => setRompimiento_tabla_creatividad(e.target.value)}
                  placeholder="Ingrese Rompimiento Tabla Creatividad"
                />
           <FormField
                  label="Rompimiento Tabla Fuerza"
                  type="text"
                  id="rompimiento_tabla_fuerza"
                  value={rompimiento_tabla_fuerza}
                  onChange={(e) => setRompimiento_tabla_fuerza(e.target.value)}
                  placeholder="Ingrese Rompimiento Tabla Fuerza"
                />
          </div>
  
          <div>
            <h2 className="font-bold">Pasos de Combate</h2>
            <FormField
                  label="Pasos Combate Coordinación"
                  type="text"
                  id="pasoscombate_coordinacion"
                  value={pasoscombate_coordinacion}
                  onChange={(e) => setPasoscombate_coordinacion(e.target.value)}
                  placeholder="Ingrese Pasos Combate Coordinación"
                />
           <FormField
                  label="Pasos Combate Agilidad"
                  type="text"
                  id="pasoscombate_agilidad"
                  value={pasoscombate_agilidad}
                  onChange={(e) => setPasoscombate_agilidad(e.target.value)}
                  placeholder="Ingrese Pasos Combate Agilidad"
                />
            <FormField
                  label="Pasos Combate Fuerza"
                  type="text"
                  id="pasoscombate_fuerza"
                  value={pasoscombate_fuerza}
                  onChange={(e) => setPasoscombate_fuerza(e.target.value)}
                  placeholder="Ingrese Pasos Combate Fuerza"
                />
          </div>
  
          <div>
            <h2 className="font-bold">Defensa Personal</h2>
            <FormField
                  label="Defensa Personal Coordinación"
                  type="text"
                  id="defensapersonal_coordinacion"
                  value={defensapersonal_coordinacion}
                  onChange={(e) => setDefensapersonal_coordinacion(e.target.value)}
                  placeholder="Ingrese Defensa Personal Coordinación"
                />
            <FormField
                  label="Defensa Personal Agilidad"
                  type="text"
                  id="defensapersonal_agilidad"
                  value={defensapersonal_agilidad}
                  onChange={(e) => setDefensapersonal_agilidad(e.target.value)}
                  placeholder="Ingrese Defensa Personal Agilidad"
                />
            <FormField
                  label="Defensa Personal Fuerza"
                  type="text"
                  id="defensapersonal_fuerza"
                  value={defensapersonal_fuerza}
                  onChange={(e) => setDefensapersonal_fuerza(e.target.value)}
                  placeholder="Ingrese Defensa Personal Fuerza"
                />
          </div>
        </div>
  
        <div className="col-span-3 flex justify-center">
            <Button onClick={handleClick}>Guardar Examen</Button>
          </div>
      </div>
    </>
  );
}  

export default FormExamen;
