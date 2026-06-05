import Navbar from '../components/Navbar'
import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <Navbar />
      {children}
      <footer className="footer-club">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/assets/amper_logo_blanco.png" alt="Amper" className="footer-logo" />
              <p>
                Club Amper recompensa tus compras con
                beneficios, promociones y premios exclusivos.
              </p>
              <h4>Visita nuestras redes sociales</h4>
              <div className="footer-social">
                <a href="https://www.facebook.com/share/1AkAQyQXFk/" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/amper.peru?igsh=MXQ2eHV2M2R3ajA2dA==" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@amper_importadora?_r=1&_t=ZS-96liSJO6PFU" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h5>Explorar</h5>
              <a href="/">Inicio</a>
              <h5>Cuenta</h5>
              {usuario ? (
                <>
                  <a href="/perfil">Mi perfil</a>
                  <a href="/productos">Canjear productos</a>
                </>
              ) : (
                <>
                  <a href="/login">Iniciar sesión</a>
                  <a href="/login/Registrar">Crear cuenta</a>
                </>
              )}
            </div>
            <div className="footer-links">
              <h5>Empresa</h5>
              <a href="https://ampercompany.com.pe/" target="_blank" rel="noopener noreferrer">
                Sitio oficial
              </a>
              <a href="#">
                Términos
              </a>
              <a href="#">
                Soporte
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © 2026 Club Amper — Todos los derechos reservados
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default MainLayout