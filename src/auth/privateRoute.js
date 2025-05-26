import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({ children, requiredPerfil }) => {
  const { user, perfil } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredPerfil && perfil !== requiredPerfil) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
