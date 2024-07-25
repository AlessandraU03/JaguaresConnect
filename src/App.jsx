// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa las páginas
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Administrador from './pages/Administrador.jsx';
import Alumnos from './pages/Alumnos.jsx';
import Instructores from './pages/Instructores.jsx';
import Equipos from './pages/Equipos.jsx';
import Eventos from './pages/Eventos.jsx';
import Reportes from './pages/Reportes.jsx';
import Examenes from './pages/Examenes.jsx';
import Anuncios from './pages/Anuncios.jsx';
import Pagos from './pages/Pagos.jsx';
import Pedidos from './pages/Pedidos.jsx';
import Asistencia from './pages/Asistencia.jsx';

// Importa los componentes
import FormAlumno from './components/organisms/FormAlumno';
import FormInstructor from './components/organisms/FormInstructor.jsx';
import FormEquipo from './components/organisms/FormEquipo.jsx';
import FormAnuncios from './components/organisms/FormAnuncios.jsx';
import FormPagos from './components/organisms/FormPagos.jsx';
import FormExamen from './components/organisms/FormExamen.jsx';
import FormAsistencia from './components/organisms/FormAsistencia.jsx';
import EventoDetail from './components/molecules/EventoDetail.jsx';
import EquipoLogic from './components/molecules/EquipoLogic.jsx';
import StudentDetail from './components/molecules/StudentDetail.jsx';
import AnuncioDetail from './components/molecules/AnuncioDetails.jsx';
import ExamenDetail from './components/molecules/ExamenDetail.jsx';
import PedidoDetail from './components/molecules/PedidoDetail.jsx';
import ListaAsistencia from './components/molecules/ListaAsistencia.jsx';
import InstructorDetail from './components/molecules/InstructorCard.jsx';
// Importa los componentes de rutas protegidas y contexto
import RouteProtectedAdmin from './pages/RouteProtectedAdmin';
import UserContext from './context/userContext.js';

// Importa los estilos
import './index.css';
import HeaderAdmi from './components/organisms/HeaderAdmi.jsx';

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
            <Route path='/HeaderAdmi' element={<HeaderAdmi/>} />
            <Route path="/Administrador" element={<Administrador />} />
            <Route path="/Alumnos" element={<Alumnos />} />
            <Route path="/Instructores" element={<Instructores />} />
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
            <Route path="/formInstructor" element={<FormInstructor />} />
            <Route path="/formEquipo" element={<FormEquipo />} />
            <Route path="/formAnuncios" element={<FormAnuncios />} />
            <Route path="/RegistrarPago" element={<FormPagos />} />
            <Route path="/RegistrarExamen" element={<FormExamen />} />
            
            {/* Rutas para detalles */}
            <Route path="/alumno/:id/view" element={<StudentDetail isEditing={false} />} />
            <Route path="/alumno/:id/edit" element={<StudentDetail isEditing={true} />} />
            <Route path="/instructor/:id" element={<InstructorDetail />} />
            <Route path="/anuncios/:id/view" element={<AnuncioDetail isEditing={false} />} />
            <Route path="/anuncios/:id/edit" element={<AnuncioDetail isEditing={true} />} />
            <Route path="/equipos/:id/view" element={<EquipoLogic isEditing={false} />} />
            <Route path="/equipos/:id/edit" element={<EquipoLogic isEditing={true} />} />
            <Route path="/evento/:id/view" element={<EventoDetail isEditing={false} />} />
            <Route path="/evento/:id/edit" element={<EventoDetail isEditing={true} />} />
            <Route path="/examen/:id/view" element={<ExamenDetail isEditing={false} />} />
            <Route path="/examen/:id/edit" element={<ExamenDetail isEditing={true} />} />
            <Route path="/pedidos/:id" element={<PedidoDetail />} />
            <Route path="/lista/:id/asistencia" element={<FormAsistencia isEditing={false} />} />
            <Route path="/lista/:id/view" element={<ListaAsistencia />} />
            <Route path="/lista/:id/edit" element={<FormAsistencia isEditing={true} />} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
