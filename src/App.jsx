// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importaciones comunes
import Home from './components/Home/pages/Home.jsx';
import Login from './components/General/pages/Login.jsx';

// Importaciones para administradores
import Administrador from './components/Administrador/Pages/Administrador.jsx';
import Alumnos from './components/Administrador/Pages/Alumnos.jsx';
import Equipos from './components/Administrador/Pages/Equipos.jsx';
import Eventos from './components/Administrador/Pages/Eventos.jsx';
import Reportes from './components/Administrador/Pages/Reportes.jsx';
import Examenes from './components/Administrador/Pages/Examenes.jsx';
import Anuncios from './components/Administrador/Pages/Anuncios.jsx';
import Pagos from './components/Administrador/Pages/Pagos.jsx';
import Pedidos from './components/Administrador/Pages/Pedidos.jsx';
import Asistencia from './components/Administrador/Pages/Asistencia.jsx';

// Componentes para administradores
import FormAlumno from './components/Administrador/organisms/FormAlumno.jsx';
import FormEquipo from './components/Administrador/organisms/FormEquipo.jsx';
import FormAnuncios from './components/Administrador/organisms/FormAnuncios.jsx';
import FormPagos from './components/Administrador/organisms/FormPagos.jsx';
import FormExamen from './components/Administrador/organisms/FormExamen.jsx';
import FormAsistencia from './components/Administrador/organisms/FormAsistencia.jsx';
import FormEvento from './components/Administrador/organisms/FormEvento.jsx';
import EventoDetail from './components/Administrador/molecules/EventoDetail.jsx';
import EquipoLogic from './components/Administrador/molecules/EquipoLogic.jsx';
import StudentDetail from './components/Administrador/molecules/StudentDetail.jsx';
import AnuncioDetails from './components/Administrador/molecules/AnuncioDetails.jsx';
import ExamenDetail from './components/Administrador/molecules/ExamenDetail.jsx';
import PedidoDetail from './components/Administrador/molecules/PedidoDetail.jsx';
import ListaAsistencia from './components/Administrador/molecules/ListaAsistencia.jsx';
import PagoEdit from './components/Administrador/molecules/PagoEdit.jsx';

// Importaciones para alumnos
import HomeAlumnos from './components/Alumno/pages/HomeAlumnos.jsx';
import AnuncioDetailsA from './components/Alumno/molecules/AnuncioDetailsAlumno.jsx';
import EquiposAlumnos from './components/Alumno/pages/EquiposAlumno.jsx';
import EquipoLogicA from './components/Alumno/molecules/EquipoLogicAlumno.jsx';
import EventosAlumnos from './components/Alumno/pages/EventosAlumnos.jsx';
import AnuncioDetailsAlumno from './components/Alumno/molecules/AnuncioDetailsAlumno.jsx';
import ExamenesAlumno from './components/Alumno/pages/ExamenesAlumno.jsx';
import ExamenDetailAlumno from './components/Alumno/molecules/ExamenDetailAlumno.jsx';
import EquipoLogicAlumno from './components/Alumno/molecules/EquipoLogicAlumno.jsx';
import EventoDetailAlumno from './components/Alumno/molecules/EventoDetail.jsx';
import AlumnoCard from './components/Alumno/molecules/AlumnoCard.jsx';

// Importaciones de contexto y rutas protegidas
import RouteProtectedAlumnos from './components/Alumno/pages/RouteProtectedAlumnos.jsx';
import RouteProtectedAdmin from './components/Administrador/Pages/RouteProtectedAdmin.jsx';
import UserContext from './context/userContext.js';

// Importaciones de estilos
import './index.css';


function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas para administradores */}
          <Route element={<RouteProtectedAdmin />}>
            <Route path="/Administrador" element={<Administrador />} />
            <Route path="/Alumnos" element={<Alumnos />} />
            <Route path="/Equipos" element={<Equipos />} />
            <Route path="/Eventos" element={<Eventos />} />
            <Route path="/Reportes" element={<Reportes />} />
            <Route path="/Examenes" element={<Examenes />} />
            <Route path="/Anuncios" element={<Anuncios />} />
            <Route path="/Pagos" element={<Pagos />} />
            <Route path="/Pedidos" element={<Pedidos />} />
            <Route path="/Asistencia" element={<Asistencia />} />
            
            {/* Rutas para formularios */}
            <Route path="/formAlumno" element={<FormAlumno />} />
            <Route path="/formEquipo" element={<FormEquipo />} />
            <Route path="/formAnuncios" element={<FormAnuncios />} />
            <Route path="/RegistrarPago" element={<FormPagos />} />
            <Route path="/RegistrarExamen" element={<FormExamen />} />
            <Route path="/RegistrarEvento" element={<FormEvento />} />

            {/* Rutas para detalles */}
            <Route path="/alumno/:id/view" element={<StudentDetail isEditing={false} />} />
            <Route path="/alumno/:id/edit" element={<StudentDetail isEditing={true} />} />
            <Route path="/anuncios/:id/view" element={<AnuncioDetails isEditing={false} />} />
            <Route path="/anuncios/:id/edit" element={<AnuncioDetails isEditing={true} />} />
            <Route path="/equipos/:id/view" element={<EquipoLogic isEditing={false} />} />
            <Route path="/equipos/:id/edit" element={<EquipoLogic isEditing={true} />} />
            <Route path="/evento/:id/view" element={<EventoDetail isEditing={false} />} />
            <Route path="/evento/:id/edit" element={<EventoDetail isEditing={true} />} />
            <Route path="/examen/:id/view" element={<ExamenDetail isEditing={false} />} />
            <Route path="/examen/:id/edit" element={<ExamenDetail isEditing={true} />} />
            <Route path="/pedidos/:id" element={<PedidoDetail />} />
            <Route path="/lista/:id/asistencia" element={<FormAsistencia isEditing={false} />} />
            <Route path="/lista/:id/view" element={<ListaAsistencia />} />
            <Route path="/EditPago/:id" element={<PagoEdit/>} />
            <Route path="/lista/:id/edit" element={<FormAsistencia isEditing={true} />} />
          </Route>

          {/* Rutas protegidas para alumnos */}
          <Route element={<RouteProtectedAlumnos />}>
            <Route path="/Alumno" element={<HomeAlumnos />} />
            <Route path="/Perfil" element={<AlumnoCard />} />
            <Route path="anuncio/:id" element={<AnuncioDetailsAlumno />} />
            <Route path="/EquiposAlumno" element={<EquiposAlumnos />} />
            <Route path="/equipo/:id" element={<EquipoLogicAlumno />} />
             <Route path="/EventosAlumnos" element={<EventosAlumnos />} />
             <Route path="/ExamenesAlumno" element={<ExamenesAlumno />} /> 
             <Route path="/examen/:id" element={<ExamenDetailAlumno/>} />
             <Route path="/evento/:id" element={<EventoDetailAlumno/>} />
           
            
          </Route>

        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
