import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import { obtenerPerfil } from "../services/usuarioService";
import { obtenerHistorial } from "../services/canjeService";
import "../styles/perfil.css";

function Perfil() {

  const [usuario, setUsuario] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const itemsPorPagina = 3;

  useEffect(() => {
    cargarPerfil();
    cargarHistorial();
  }, []);

  const cargarPerfil = async () => {

    const response = await obtenerPerfil();

    if (response?.success) {
      setUsuario(response.data);
    }
  };

  const cargarHistorial = async () => {

    const response = await obtenerHistorial();

    if (response?.success) {
      setHistorial(response.data);
    }
  };

  if (!usuario) {

    return (
      <MainLayout>
        <div className="loading">
          Cargando perfil...
        </div>
      </MainLayout>
    );
  }
  const indiceInicial =
    (paginaActual - 1) * itemsPorPagina;

  const indiceFinal =
    indiceInicial + itemsPorPagina;

  const historialPaginado =
    historial.slice(indiceInicial, indiceFinal);

  const totalPaginas =
    Math.ceil(historial.length / itemsPorPagina);

  return (
    <MainLayout>

      <div className="dashboard">
        {/* HEADER */}
        <div className="card header-card">
          <div className="avatar">
            {usuario.nombres?.charAt(0)}
          </div>
          <div>
            <h2>
              {usuario.nombres} {usuario.apellidos}
            </h2>
            <p>{usuario.correo}</p>
          </div>
          <span
            className={`badge ${usuario.rol_id === 1
              ? "admin"
              : "user"
              }`}
          >
            {usuario.rol_id === 1
              ? "Administrador"
              : "Cliente"}
          </span>

        </div>

        <div className="grid">

          {/* IZQUIERDA */}
          <div className="left-column">

            {/* PUNTOS */}
            <div className="card points-card">
              <h3>Puntos acumulados</h3>
              <div className="points">
                {usuario.puntos}
              </div>
              <p className="hint">
                Usa tus puntos para canjear productos
              </p>
            </div>

            {/* DATOS */}
            <div className="card compact-info">
              <div className="info-item">
                <span className="info-label">
                  {usuario.tipo_documento?.toUpperCase()}
                </span>
                <span className="info-value">
                  {usuario.documento}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">
                  CORREO
                </span>
                <span className="info-value">
                  {usuario.correo}
                </span>
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="card historial-card">
            <h3>Historial de canjes</h3>
            <div className="historial">
              {historial.length === 0 ? (
                <p>No hay canjes todavía</p>
              ) : (
                historialPaginado.map(canje => (
                  <div className="canje-item" key={canje.id}>
                    <div>
                      <strong>
                        Ticket #{canje.id}
                      </strong>
                      <br />
                      <strong>
                        {canje.nombre_producto}
                      </strong>
                      <p>
                        {canje.total_puntos} puntos
                      </p>

                    </div>
                    <span>
                      {canje.fecha}
                    </span>
                  </div>
                  
                ))
              )}
              {
  totalPaginas > 1 && (
    <div className="paginacion">

      <button
        disabled={paginaActual === 1}
        onClick={() =>
          setPaginaActual(paginaActual - 1)
        }
      >
        ←
      </button>

      {
        [...Array(totalPaginas)].map((_, index) => (

          <button
            key={index}
            className={
              paginaActual === index + 1
                ? "active"
                : ""
            }
            onClick={() =>
              setPaginaActual(index + 1)
            }
          >
            {index + 1}
          </button>

        ))
      }

      <button
        disabled={paginaActual === totalPaginas}
        onClick={() =>
          setPaginaActual(paginaActual + 1)
        }
      >
        →
      </button>

    </div>
  )
}
            </div>

          </div>

        </div>


        {/* FOOTER */}
        <div className="card bottom-card">

          <h3>Resumen</h3>

          <p>
            Bienvenido a Club Amper,
            aquí puedes acumular puntos
            y canjear beneficios exclusivos.
          </p>

        </div>

      </div>

    </MainLayout>
  );
}

export default Perfil;