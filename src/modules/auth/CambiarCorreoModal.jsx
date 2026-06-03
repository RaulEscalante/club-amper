import { useState } from "react";
import { cambiarCorreoVerificacion } from "../../services/usuarioService";
import { alertaExito, alertaError } from "../../utils/alerts";

function CambiarCorreoModal({
    correoActual,
    onClose,
    onSuccess
}) {

    const [correoNuevo, setCorreoNuevo] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleGuardar = async () => {

        if (!correoNuevo.trim()) {

            alertaError(
                "Ingresa un correo válido"
            );

            return;
        }

        setLoading(true);

        const response =
            await cambiarCorreoVerificacion(
                correoActual,
                correoNuevo
            );

        setLoading(false);

        if (response?.success) {

            localStorage.setItem(
                "correoPendienteVerificacion",
                correoNuevo
            );

            alertaExito(
                "Correo actualizado correctamente"
            );

            onSuccess(correoNuevo);

            onClose();

        } else {

            alertaError(
                response?.message ||
                "No se pudo actualizar el correo"
            );

        }
    };

    return (
        <div className="modal-overlay">

            <div className="modal-content">

                <h3>Cambiar correo</h3>

                <p>
                    Ingresa el correo correcto para
                    recibir el enlace de verificación.
                </p>

                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Nuevo correo"
                    value={correoNuevo}
                    onChange={(e) =>
                        setCorreoNuevo(
                            e.target.value
                        )
                    }
                />

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