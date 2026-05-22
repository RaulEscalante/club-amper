import { Link, useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { usuario, logout } = useAuth();  

  return (
    <>
      {/* NAVBAR */}
      <nav className="custom-navbar">

  <div className="navbar-container">

    {/* LOGO */}
    <Link className="navbar-brand-custom" to="/">

      <img
        src="/assets/amper_logo_blanco.png"
        alt="Logo"
        className="logo-img"
      />

    </Link>

    {/* LINKS */}
    <div className="navbar-links">

      <Link className="nav-item-custom" to="/">
        Inicio
      </Link>

      <Link className="nav-item-custom" to="/productos">
        Productos
      </Link>

      {/* ADMIN */}
      {usuario?.rol_id === 1 && (

        <div className="admin-links">

          <Link
            className="nav-admin"
            to="/admin/productos"
          >
            Productos
          </Link>

          <Link
            className="nav-admin"
            to="/admin/canjes"
          >
            Canjes
          </Link>

        </div>

      )}

      {/* NO LOGUEADO */}
      {!usuario && (

        <div className="auth-buttons">

          <Link
            className="btn-login"
            to="/login"
          >
            Iniciar sesión
          </Link>

          <Link
            className="btn-register"
            to="/login/Registrar"
          >
            Registrarse
          </Link>

        </div>

      )}

      {/* LOGUEADO */}
      {usuario && (

        <div className="user-section">

          <Link
            className="user-profile"
            to="/perfil"
          >

            <div className="user-avatar">
              {usuario.nombres?.charAt(0)}
            </div>

            <span>
              Hola, {usuario.nombres}
            </span>

          </Link>

          <button className="btn-logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Salir
          </button>

        </div>

      )}

    </div>

  </div>

</nav>
    </>
  )
}

export default Navbar