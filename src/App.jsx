import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './modules/productos/Productos'
import IniciarSesion from './modules/auth/IniciarSesion'
import Registrar from './modules/auth/Registrar'
import AdminProductos from './modules/admin/AdminProductos'
import AdminRoute from "./components/AdminRoute";
import Perfil from './pages/Perfil'
import AdminCanjes from './modules/admin/AdminCanjes'
import VerificarCorreo from './pages/VerificarCorreo'
import VerificacionPendiente from './pages/VerificacionPendiente'
import ForgotPassword from './modules/auth/ForgotPassword'
import ResetPassword from './modules/auth/ResetPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      {/* Solo admin */}
      <Route path="/admin/productos"
        element={
          <AdminRoute><AdminProductos/></AdminRoute>
        }
      />
      <Route path="/admin/canjes"
        element={
          <AdminRoute><AdminCanjes/></AdminRoute>
        }
      />
      <Route path="/login" element={<IniciarSesion />} />
      <Route path="/login/registrar" element={<Registrar />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/verificar" element={<VerificarCorreo />}/>
      <Route path="/verificar-correo-info" element={<VerificacionPendiente />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/reset-password" element={<ResetPassword />}/>
    </Routes>
  )
}

export default App