import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../../../context/userContext';

function RouteProtectedAlumnos() {
  const { user } = useContext(UserContext);

  return (
    user && user.role === 'alumno' ? <Outlet /> : <Navigate to="/login" />
  );
}

export default RouteProtectedAlumnos;
