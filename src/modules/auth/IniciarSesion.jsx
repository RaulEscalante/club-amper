import MainLayout from '../../layouts/MainLayout'
import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { loginUsuario } from "../../services/usuarioService";
import { useAuth } from "../../context/AuthContext";
import { alertaExito, alertaError } from "../../utils/alerts";

function IniciarSesion() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    correo: "", password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await loginUsuario(formData);

    if (response?.success) {
      // guardar usuario
      login(response.data);

      alertaExito("Bienvenido " + response.data.nombres);
      navigate("/productos");

    } else {
      alertaError("Credenciales incorrectas");
    }

  };

  return (
    <MainLayout>

      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input type="email" name="correo" className="form-control"
                placeholder="Ingresa tu correo" value={formData.correo} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <input type="password" name="password" className="form-control"
                placeholder="Ingresa tu contraseña" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit" className="btn login-btn text-white w-100">Ingresar</button>
            <Link to="/login/Registrar" className="btn btn-secondary w-100 mt-2">
              Registrarse
            </Link>
            <Link to="/forgot-password" className="btn btn-link">
              ¿Olvidaste tu contraseña?
            </Link>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
export default IniciarSesion