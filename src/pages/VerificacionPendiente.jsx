import { Link } from 'react-router-dom';
import { useState } from 'react';
import { reenviarVerificacion } from '../services/usuarioService';
import { alertaExito, alertaError } from '../utils/alerts';
import { CambiarCorreoModal } from '../modules/auth/CambiarCorreoModal';

function VerificacionPendiente() {

  const [correo, setCorreo] =
    useState(
      localStorage.getItem(
        "correoPendienteVerificacion"
      ) || ""
    );
  const [loading, setLoading] = useState(false);

  const [mostrarModal, setMostrarModal] =  useState(false);

  const handleReenviar = async () => {
    setLoading(true);
    const response = await reenviarVerificacion(correo);
    setLoading(false);
    if (response?.success) {
      alertaExito(
        "Correo enviado nuevamente"
      );
    } else {

      alertaError(
        response?.message ||
        "No se pudo reenviar"
      );

    }
  };

  return (
    <div className="verify-page">

      <div className="verify-card">
        <h2>📩 Revisa tu correo</h2>
        <p>
          Hemos enviado un correo a:
        </p>
        <strong>{correo}</strong>
        <p>
          Si no lo ves, revisa spam o promociones.
        </p>
        <hr />
        <button className="btn btn-primary w-100 mb-3" onClick={handleReenviar} disabled={loading}>
          {
            loading
              ? "Enviando..."
              : "Reenviar correo"
          }
        </button>

        <button className="btn btn-outline-secondary w-100 mb-3"
          onClick={() =>
            setMostrarModal(true)
          }>
          Cambiar correo
        </button>

        <Link
          to="/login"
          className="verify-btn"
        >
          Ir al login
        </Link>

      </div>

      {
        mostrarModal && (
          <CambiarCorreoModal
            correoActual={correo}
            onClose={() =>
              setMostrarModal(false)
            }
            onSuccess={(nuevoCorreo) =>
              setCorreo(nuevoCorreo)
            }
          />
        )
      }

    </div>
  );
}

export default VerificacionPendiente;