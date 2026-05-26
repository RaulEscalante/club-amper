function VerificacionPendiente() {
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

        <Link to="/login" className="verify-btn">
          Ir al login
        </Link>

      </div>
    </div>
  );
}
export default VerificacionPendiente;