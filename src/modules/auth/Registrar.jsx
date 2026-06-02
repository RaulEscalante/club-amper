import '../../styles/registro.css'
import { useState } from "react";
import { registrarUsuario } from "../../services/usuarioService";
import { useNavigate, Link } from "react-router-dom";
import { alertaExito, alertaError } from "../../utils/alerts";

function Registrar() {
    const navigate = useNavigate();
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        tipo_documento: "",
        documento: "",
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        confirmar: "",
        telefono: ""
    });
    const handleChange = (e) => {

        let { name, value } = e.target;

        if (name === "tipo_documento") {
            setErrores(prev => ({
                ...prev,
                tipo_documento: null,
                documento: null
            }));
            setFormData(prev => ({
                ...prev,
                tipo_documento: value,
                documento: ""
            }));
            return;
        }
        // Documento → solo números
        if (name === "documento") {

            // DNI y RUC → solo números
            if (
                formData.tipo_documento === "dni" ||
                formData.tipo_documento === "ruc"
            ) {
                value = value.replace(/\D/g, "");
            }

            // Límites por tipo
            if (formData.tipo_documento === "dni") {
                value = value.slice(0, 8);
            }

            if (formData.tipo_documento === "ruc") {
                value = value.slice(0, 11);
            }

            if (formData.tipo_documento === "passport") {
                value = value.slice(0, 12);
            }
        }
        if (name === "telefono") {

            value = value.replace(/\D/g, "");

            value = value.slice(0, 9);

        }

        // Nombres y apellidos → solo letras y espacios
        if (name === "nombres" || name === "apellidos") {
            value = value.replace(
                /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                ""
            );
        }
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: null
            }));
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const nuevosErrores = {};

        // Tipo documento
        if (!formData.tipo_documento) {
            nuevosErrores.tipo_documento =
                "Selecciona un tipo de documento";
        }

        // Documento
        if (!formData.documento.trim()) {
            nuevosErrores.documento =
                "Ingresa tu número de documento";
        }
        else if (
            formData.tipo_documento === "dni" &&
            formData.documento.length !== 8
        ) {
            nuevosErrores.documento =
                "El DNI debe tener 8 dígitos";
        }
        else if (
            formData.tipo_documento === "ruc" &&
            formData.documento.length !== 11
        ) {
            nuevosErrores.documento =
                "El RUC debe tener 11 dígitos";
        } else if (
            formData.tipo_documento === "passport" &&
            formData.documento.length < 6
        ) {
            nuevosErrores.documento =
                "El pasaporte debe tener al menos 6 caracteres";
        }

        // Nombres
        if (!formData.nombres.trim()) {
            nuevosErrores.nombres =
                "Ingresa tus nombres";
        }

        // Apellidos
        if (!formData.apellidos.trim()) {
            nuevosErrores.apellidos =
                "Ingresa tus apellidos";
        }

        // Correo
        if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            nuevosErrores.correo =
                "Ingresa un correo válido";
        }

        // Password
        if (formData.password.trim().length < 6) {
            nuevosErrores.password =
                "Mínimo 6 caracteres";
        }
        if (!/^[0-9]{9}$/.test(formData.telefono)) {
            nuevosErrores.telefono =
                "Ingrese un número válido";
        }

        // Confirmación
        if (!formData.confirmar.trim()) {
            nuevosErrores.confirmar =
                "Confirma tu contraseña";
        }
        else if (formData.password !== formData.confirmar) {
            nuevosErrores.confirmar =
                "Las contraseñas no coinciden";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setErrores({});

        setLoading(true);

        const response = await registrarUsuario(formData);

        setLoading(false);

        if (response?.success) {
            localStorage.setItem(
                "correoPendienteVerificacion",
                formData.correo
            );
            alertaExito("Usuario registrado correctamente");
            navigate("/verificar-correo-info");
        } else {

            if (response?.message === "El correo ya está registrado") {
                setErrores(prev => ({
                    ...prev,
                    correo: "Este correo ya existe"
                }));
            }

            if (response?.message === "El documento ya está registrado") {
                setErrores(prev => ({
                    ...prev,
                    documento: "Este documento ya existe"
                }));
            }
        }
    };
    return (
        <>
            <div className="back-container">
                <Link to="/login" className="btn back-btn ">
                    ← Regresar
                </Link>
            </div>
            <div className="login-container">

                <div className="login-card info-card">
                    <div className="logoregi-container">
                        <img src="/assets/amper_logo_blanco.png" alt="Logo" className="logo-amper-reg" />
                    </div>
                    <h4 className="navbar-brand-reg fw-bold logo-amper" to="#">
                        <p className="orac">Club Amper</p>
                    </h4>
                    <h3 className="login-title mb-4 textop">
                        MAS QUE COMPRAS, RECOMPENSAS.
                    </h3>

                    <p className="welcome-text">
                        Únete a nuestro programa exclusivo y convierte cada compra en nuevas oportunidades.
                    </p>

                    <div className="beneficios-box">
                        <p>✓ Acumula puntos automáticamente</p>
                        <p>✓ Canjea premios exclusivos</p>
                        <p>✓ Accede a campañas y promociones especiales</p>
                        <p>✓ Sé parte de nuestra comunidad de clientes preferenciales</p>
                    </div>

                    <p className="footer-text">
                        Mientras más compras, más beneficios obtienes.
                    </p>

                </div>

                <div className="login-card form-card">
                    <h1 className="login-title2">Registrar</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Tipo de documento</label>
                                <select className={`form-select ${errores.tipo_documento ? "is-invalid" : ""}`}
                                    name="tipo_documento" value={formData.tipo_documento} onChange={handleChange}>
                                    <option value="">Selecciona</option>
                                    <option value="dni">DNI</option>
                                    <option value="ruc">RUC</option>
                                    <option value="passport">Pasaporte</option>
                                    <option value="other">Otro</option>
                                </select>
                                {errores.tipo_documento && (
                                    <div className="invalid-feedback">{errores.tipo_documento}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">N° Documento</label>
                                <input type="text" name="documento" className={`form-control ${errores.documento ? "is-invalid" : ""}`}
                                    value={formData.documento} onChange={handleChange} />
                                {errores.documento && (
                                    <div className="invalid-feedback">{errores.documento}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nombres</label>
                                <input type="text" name="nombres" className={`form-control ${errores.nombres ? "is-invalid" : ""}`}
                                    placeholder="Nombres" value={formData.nombres} onChange={handleChange} />
                                {errores.nombres && (
                                    <div className="invalid-feedback">{errores.nombres}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" name="apellidos"
                                    className={`form-control ${errores.apellidos ? "is-invalid" : ""}`}
                                    value={formData.apellidos} onChange={handleChange} />
                                {errores.apellidos && (
                                    <div className="invalid-feedback">{errores.apellidos}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Correo electrónico</label>
                                <input type="email" name="correo"
                                    className={`form-control ${errores.correo ? "is-invalid" : ""}`}
                                    value={formData.correo} onChange={handleChange} />
                                {errores.correo && (
                                    <div className="invalid-feedback">{errores.correo}</div>
                                )}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Teléfono</label>
                                <input
                                    type="tel" name="telefono" inputMode="numeric" placeholder="#"
                                    maxLength={9} className={`form-control ${errores.telefono ? "is-invalid" : ""}`}
                                    value={formData.telefono} onChange={handleChange} />
                                {errores.telefono && (
                                    <div className="invalid-feedback">{errores.telefono}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Contraseña</label>
                                <input type="password" name="password"
                                    className={`form-control ${errores.password ? "is-invalid" : ""}`}
                                    value={formData.password} onChange={handleChange} />
                                {errores.password && (
                                    <div className="invalid-feedback">{errores.password}</div>
                                )}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Confirmar</label>
                                <input type="password" name="confirmar"
                                    className={`form-control ${errores.confirmar ? "is-invalid" : ""}`}
                                    value={formData.confirmar} onChange={handleChange} />
                                {errores.confirmar && (
                                    <div className="invalid-feedback">{errores.confirmar}</div>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn login-btn text-white w-100 mt-3">
                            {loading ? "Registrando..." : "Registrar"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}
export default Registrar