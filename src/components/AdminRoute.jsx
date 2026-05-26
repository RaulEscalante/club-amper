import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { usuario, loading } = useAuth();

  // esperar recuperación de sesión
  if (loading) {
    return null;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.rol_id !== 1) {
    return <Navigate to="/productos" replace />;
  }

  return children;
}

export default AdminRoute;