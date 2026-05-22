import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol_id !== 1) {
    return <Navigate to="/productos" />;
  }

  return children;
}

export default AdminRoute;