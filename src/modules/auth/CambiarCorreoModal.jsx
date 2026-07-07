import { useState } from "react";

import {
    cambiarCorreoVerificacion,
    cambiarPassword,
    cambiarCorreoPerfil
}
from "../../services/usuarioService";

import {
    alertaExito,
    alertaError
}
from "../../utils/alerts";

function CambiarCorreoModal({

    tipo = "correo",

    correoActual,

    onClose,

    onSuccess

}) {

    const [correoNuevo,
        setCorreoNuevo] =
        useState("");

    const [passwordActual,
        setPasswordActual] =
        useState("");

    const [passwordNueva,
        setPasswordNueva] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    const handleGuardar =
        async () => {

            setLoading(true);

            let response;

            /*
            |-------------------------
            | CAMBIAR CORREO
            |-------------------------
            */

            if (
                tipo === "correo"
            ) {
                if (
                    !correoNuevo.trim()
                ) {
                    alertaError("Ingresa un correo válido");
                    setLoading(false);
                    return;
                }
                response = await cambiarCorreoPerfil(correoNuevo);
            }
            /*
            |-------------------------
            | CAMBIAR PASSWORD
            |-------------------------
            */
            if (tipo === "password") {
                if (!passwordActual || !passwordNueva) {
                    alertaError("Completa todos los campos");
                    setLoading(false);
                    return;
                }

                response = await cambiarPassword({
                        password_actual: passwordActual,
                        password_nueva: passwordNueva
                    });

            }

            setLoading(false);

            if (
                response?.success
            ) {

                if (
                    tipo === "correo"
                ) {

                    localStorage.setItem(
                        "correoPendienteVerificacion",
                        correoNuevo
                    );

                    onSuccess?.(
                        correoNuevo
                    );

                }

                alertaExito(
                    response.message
                );

                onClose();

            } else {

                alertaError(
                    response?.message ||
                    "Error"
                );

            }

        };

    return (

        <div className="modal-overlay">

            <div className="modal-content">

                <h3>

                    {
                        tipo === "correo"
                            ? "Cambiar correo"
                            : "Cambiar contraseña"
                    }

                </h3>

                {

                    tipo === "correo" && (

                        <>
                            <p>

                                Ingresa el nuevo correo.

                            </p>

                            <input
                                type="email"
                                className="form-control mb-3"
                                placeholder="Nuevo correo"
                                value={correoNuevo}
                                onChange={(e)=>
                                    setCorreoNuevo(
                                        e.target.value
                                    )
                                }
                            />
                        </>

                    )

                }

                {

                    tipo === "password" && (

                        <>

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Contraseña actual"
                                value={passwordActual}
                                onChange={(e)=>
                                    setPasswordActual(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="password"
                                className="form-control mb-3"
                                placeholder="Nueva contraseña"
                                value={passwordNueva}
                                onChange={(e)=>
                                    setPasswordNueva(
                                        e.target.value
                                    )
                                }
                            />

                        </>

                    )

                }

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleGuardar}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Guardando..."
                                : "Guardar"
                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CambiarCorreoModal;