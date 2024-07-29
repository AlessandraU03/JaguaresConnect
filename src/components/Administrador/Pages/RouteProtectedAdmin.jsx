import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../../../context/userContext';

function RouteProtectedAdmin() {
  const { user } = useContext(UserContext);

  return (
    user && user.role === 'administrador' ? <Outlet /> : <Navigate to="/login" />
  );
}

export default RouteProtectedAdmin;
