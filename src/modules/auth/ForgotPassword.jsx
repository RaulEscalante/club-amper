import MainLayout from "../../layouts/MainLayout";
import "../../styles/login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/usuarioService";
import { alertaExito, alertaError} from "../../utils/alerts";

function ForgotPassword() {

    const [correo, setCorreo] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!correo.trim()) {
            alertaError(
                "Ingresa tu correo electrónico"
            );
            return;
        }
        setLoading(true);
        const response = await forgotPassword(correo);
        setLoading(false);
        if (response?.success) {
            alertaExito(
                "Te enviamos un enlace para recuperar tu contraseña"
            );
            setCorreo("");
        } else {
            alertaError(
                response?.message ||
                "No se pudo procesar la solicitud"
            );
        }
    };

    return (
        <MainLayout>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title"> Recuperar Contraseña </h1>

                    <p className="text-center mb-4">
                        Ingresa el correo con el que te registraste.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label">
                                Correo electrónico
                            </label>
                            <input type="email" className="form-control" placeholder="correo@ejemplo.com"
                                value={correo} onChange={(e) => setCorreo(e.target.value)}/>
                        </div>
                        <button type="submit" disabled={loading} className="btn login-btn text-white w-100">
                            {loading
                                ? "Enviando..."
                                : "Enviar enlace"}
                        </button>

                        <Link to="/login" className="btn btn-secondary w-100 mt-2">
                            Volver al Login
                        </Link>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default ForgotPassword;