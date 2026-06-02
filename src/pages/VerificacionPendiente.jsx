import { Link } from 'react-router-dom';
import { useState } from 'react';
import { reenviarVerificacion } from '../services/usuarioService';
import {
  alertaExito,
  alertaError
} from '../utils/alerts';

function VerificacionPendiente() {

  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReenviar = async () => {

    if (!correo.trim()) {
      alertaError("Ingresa tu correo");
      return;
    }

    setLoading(true);

    const response =
      await reenviarVerificacion(correo);

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
          Te enviamos un enlace para verificar tu cuenta.
        </p>

        <p>
          Si no lo ves, revisa spam o promociones.
        </p>

        <hr />

        <h5>
          ¿No recibiste el correo?
        </h5>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Ingresa tu correo"
          value={correo}
          onChange={(e) =>
            setCorreo(e.target.value)
          }
        />

        <button
          className="btn btn-primary w-100 mb-3"
          onClick={handleReenviar}
          disabled={loading}
        >
          {
            loading
              ? "Enviando..."
              : "Reenviar correo"
          }
        </button>

        <Link
          to="/login"
          className="verify-btn"
        >
          Ir al login
        </Link>

      </div>

    </div>
  );
}

export default VerificacionPendiente;