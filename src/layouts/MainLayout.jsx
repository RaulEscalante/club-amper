import Navbar from '../components/Navbar'
import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  return (
    <>
      <Navbar />
      {children}
      <footer className="footer-club">

        <div className="container">

          <div className="footer-top">

            <div className="footer-brand">

              <img
                src="/assets/amper_logo_blanco.png"
                alt="Amper"
                className="footer-logo"
              />

              <p>
                Club Amper recompensa tus compras con
                beneficios, promociones y premios exclusivos.
              </p>

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

              <a
                href="https://ampercompany.com.pe/"
                target="_blank"
                rel="noopener noreferrer"
              >
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