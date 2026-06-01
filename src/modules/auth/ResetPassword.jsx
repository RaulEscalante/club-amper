import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/usuarioService";

import { alertaExito, alertaError } from "../../utils/alerts";

function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alertaError("Token inválido");
            return;
        }
        if (password.length < 6) {
            alertaError(
                "La contraseña debe tener mínimo 6 caracteres"
            );

            return;
        }

        if (password !== confirmar) {

            alertaError(
                "Las contraseñas no coinciden"
            );

            return;
        }

        setLoading(true);

        const response =
            await resetPassword(
                token,
                password
            );

        setLoading(false);

        if (response.success) {

            alertaExito(
                "Contraseña actualizada correctamente"
            );

            navigate("/login");

        } else {

            alertaError(
                response.message
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    Nueva contraseña
                </h1>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Nueva contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Confirmar contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={confirmar}
                            onChange={(e) =>
                                setConfirmar(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn login-btn text-white w-100"
                    >
                        {
                            loading
                                ? "Actualizando..."
                                : "Guardar contraseña"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ResetPassword;