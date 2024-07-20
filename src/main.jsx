import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomeAdmi from './pages/Administrador.jsx';
import Login from './pages/Login.jsx';
import FormAlumno from './components/organisms/FormAlumno';
import Home from './pages/Home.jsx';
import './index.css';
import EventoDetail from './components/molecules/EventoDetail.jsx';
import EquipoLogic from './components/molecules/EquipoLogic.jsx';
import { createRoot } from 'react-dom/client';
import FormInstructor from './components/organisms/FormInstructor.jsx';
import Equipos from './pages/Equipos.jsx';
import Eventos from './pages/Eventos.jsx';
import StudentDetail from './components/molecules/StudentDetail.jsx';
import FormEquipo from './components/organisms/FormEquipo.jsx';
import Alumnos from './pages/Alumnos.jsx';
import Instructores from './pages/Instructores.jsx';
import Reportes from './pages/Reportes.jsx';
import Examenes from './pages/Examenes.jsx';
import Anuncios from './pages/Anuncios.jsx';
import FormAnuncios from './components/organisms/FormAnuncios.jsx';
import AnuncioDetail from './components/molecules/AnuncioDetails.jsx';
import Pagos from './pages/Pagos.jsx';
import Pedidos from './pages/Pedidos.jsx';
import Asistencia from './pages/Asistencia.jsx';
import Administrador from './pages/Administrador.jsx';
import FormEvento from './components/organisms/FormEvento.jsx';
import InstructorDetail from './components/molecules/InstructorDetail.jsx';
import FormPagos from './components/organisms/FormPagos.jsx';
import FormExamen from './components/organisms/FormExamen.jsx';
import ExamenDetail from './components/molecules/ExamenDetail.jsx';
import PedidoDetail from './components/molecules/PedidoDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Administrador",
    element: <Administrador />
  },
  {
    path: "/Alumnos",
    element: <Alumnos />
  },
  {
    path: "/Instructores",
    element: <Instructores />
  },
  {
    path: "/formAlumno",
    element: <FormAlumno />
  },
  {
    path: "/RegistrarPago",
    element: <FormPagos />
  },
  {
    path: "/formInstructor",
    element: <FormInstructor />
  },
  {
    path: "/Equipos",
    element: <Equipos />
  },
  {
    path: "/formEquipo",
    element: <FormEquipo />
  },
  {
    path: "/Reportes",
    element: <Reportes />
  },
  {
    path: "/Examenes",
    element: <Examenes />
  },
  {
    path: "/Anuncios",
    element: <Anuncios />
  },
  {
    path: "/Eventos",
    element: <Eventos />
  },
  {
    path: "/RegistrarEvento",
    element: <FormEvento />,
  },
  {
    path: "/Pagos",
    element: <Pagos />,
  },
  {
    path: "/Pedidos",
    element: <Pedidos />
  },
  {
    path: "/Asistencia",
    element: <Asistencia />
  },
  {
    path: "/formAnuncios",
    element: <FormAnuncios />
  },
  {
    path: "/alumno/:id/view",
    element: <StudentDetail isEditing={false} />
  },
  {
    path: "/alumno/:id/edit",
    element: <StudentDetail isEditing={true} />
  },

  {
    path: "/instructor/:id",
    element: <InstructorDetail />
  },
  {
    path: "/anuncios/:id/view",
    element: <AnuncioDetail isEditing={false} />
  },
  {
    path: "/anuncios/:id/edit",
    element: <AnuncioDetail isEditing={true} />
  },

  {
    path: "/equipos/:id/view",
    element: <EquipoLogic isEditing={false} />
  },
  {
    path: "/equipos/:id/edit",
    element: <EquipoLogic isEditing={true} />
  },
  
  {
    path: "/evento/:id/view",
    element: <EventoDetail isEditing={false} />
  },
  {
    path: "/evento/:id/edit",
    element: <EventoDetail isEditing={true} />
  },
  {
    path: "/examen/:id/view",
    element: <ExamenDetail isEditing={false} />
  },
  {
    path: "/examen/:id/edit",
    element: <ExamenDetail isEditing={true} />
  },
  {
    path: "/RegistrarExamen",
    element: <FormExamen/>
  },

  {
    path: "/pedidos/:id",
    element: <PedidoDetail/>
  },
]);


// Utiliza createRoot desde react-dom/client para inicializar el renderizado de React
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
