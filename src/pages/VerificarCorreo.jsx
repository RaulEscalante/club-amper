import { useEffect, useState } from "react";
import {
  useSearchParams,
  Link
} from "react-router-dom";

import "../styles/verificar.css";

function VerificarCorreo() {

  const [searchParams] =
    useSearchParams();

  const [estado, setEstado] =
    useState("verificando");

  const [mensaje, setMensaje] =
    useState("");

  useEffect(() => {

    const token =
      searchParams.get("token");

    if (!token) {

      setEstado("error");

      setMensaje("Token inválido");

      return;
    }

    verificar(token);

  }, []);

  const verificar = async (token) => {

    try {

      const response = await fetch(
        `https://api.ampercompany.com.pe/api/auth/verificar.php?token=${token}`
      );

      const data =
        await response.json();

      if (data.success) {

        setEstado("success");

      } else {

        setEstado("error");
      }

      setMensaje(data.message);

    } catch (error) {

      setEstado("error");

      setMensaje(
        "Error al verificar correo"
      );
    }
  };

  return (

    <div className="verify-page">

      <div className="verify-card">

        <img
          src="/assets/amper_logo_rojo.png"
          alt="Amper"
          className="verify-logo"
        />

        {estado === "verificando" && (
          <>
            <div className="verify-loader"></div>

            <h2>
              Verificando correo...
            </h2>

            <p>
              Espera un momento
            </p>
          </>
        )}

        {estado === "success" && (
          <>
            <div className="verify-icon success">
              ✓
            </div>

            <h2>
              Correo verificado
            </h2>

            <p>{mensaje}</p>

            <Link
              to="/login"
              className="verify-btn"
            >
              Ir al login
            </Link>
          </>
        )}

        {estado === "error" && (
          <>
            <div className="verify-icon error">
              ✕
            </div>

            <h2>
              Error de verificación
            </h2>

            <p>{mensaje}</p>

            <Link
              to="/"
              className="verify-btn"
            >
              Volver al inicio
            </Link>
          </>
        )}

      </div>

    </div>
  );
}

export default VerificarCorreo;