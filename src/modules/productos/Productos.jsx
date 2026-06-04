import { useEffect, useState } from "react";
import MainLayout from '../../layouts/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerProductos, eliminarProducto, reactivarProducto } from "../../services/productosService";
import '../../styles/productos.css'
import { canjearProducto } from "../../services/canjeService";
import { alertaExito, alertaError, alertaConfirmacion } from "../../utils/alerts";
import ProductoModal from "../../components/ProductoModal";

function Productos() {
  const API_URL = "https://api.ampercompany.com.pe";
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [mostrarModal, setMostrarModal] =
    useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const cargarProductos = async () => {
    setLoading(true);
    const response = await obtenerProductos();
    if (response && response.success) {
      setProductos(response.data);
    }
    setLoading(false);
  };
  const productosPorPagina = 8;
  useEffect(() => {
    cargarProductos();
  }, []);


  const navigate = useNavigate();
  const handleEditar = (producto) => {
    navigate("/productos/agregar", {
      state: producto
    });
  };

  const productosActivos = productos.filter(
    p => p.estado == 1
  );
  const totalPaginas = Math.ceil(
    productosActivos.length / productosPorPagina
  );
  const indiceUltimo = paginaActual * productosPorPagina;

  const indicePrimero =
    indiceUltimo - productosPorPagina;

  const productosPaginados =
    productosActivos.slice(
      indicePrimero,
      indiceUltimo
    );



  const handleEliminar = async (id) => {
    const confirmar = await alertaConfirmacion(
      "¿Deseas desactivar este producto?"
    );
    if (!confirmar.isConfirmed) return;
    const response = await eliminarProducto(id);
    if (response?.success) {
      alertaExito("Producto desactivado");
      cargarProductos();
    } else {
      alertaError(
        response?.message || "Error al desactivar"
      );
    }
  };
  const handleReactivar = async (id) => {
    const confirmar = await alertaConfirmacion(
      "¿Deseas activar este producto?"
    );
    if (!confirmar.isConfirmed) return;
    const response = await reactivarProducto(id);
    if (response?.success) {
      alertaExito("Producto reactivado");
      cargarProductos();
    } else {
      alertaError(
        response?.message || "Error al reactivar"
      );
    }
  };
  const handleCanjear = async (producto) => {
    const data = {
      productos: [
        {
          producto_id: producto.id,
          cantidad: 1
        }
      ]
    };

    const response = await canjearProducto(data);
    if (response?.success) {
      alertaExito("Canje realizado correctamente");
      cargarProductos();
      window.open(
        response.data.whatsapp_url,
        "_blank"
      );
    } else {
      alertaError(
        response?.message ||
        "Error al realizar el canje"
      );
    }
  };

  if (loading) {

    return (
      <MainLayout>
        <div className="loading">
          Cargando canjes...
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="container mt-5 prodc">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="admin-productos-header mb-4">Catálogo de Productos</h1>
          {usuario?.rol_id === 1 && (
            <Link className="btn-agregar-producto" onClick={() => {
              setProductoEditar(null);
              setMostrarModal(true);
            }}>
              Agregar Producto
            </Link>
          )}
        </div>

        <div className="row">
          {productosPaginados.map(producto => (
            <div className="col-md-4 col-lg-3 mb-4" key={producto.id}>
              <div className="producto-card">

                <div className="producto-img-container">
                  <img
                    src={producto.imagen ? `${API_URL}/uploads/productos/${producto.imagen}` : "/assets/no-image.png"}
                    alt={producto.nombre}
                    className="producto-img"
                  />
                </div>

                <div className="producto-info">
                  {usuario?.rol_id === 1 && (
                    <span
                      className={`badge mb-2 ${producto.estado == 1
                        ? "bg-success"
                        : "bg-secondary"
                        }`}
                    >
                      {producto.estado == 1
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  )}
                  <span className="producto-sku">
                    {producto.codigo_sku}
                  </span>
                  <h5 className="producto-nombre">
                    {producto.nombre}
                  </h5>

                  <p className="producto-marca">
                    {producto.marca}
                  </p>

                  <div className="producto-puntos">
                    {producto.puntos_requeridos} puntos
                  </div>

                  <div className="producto-actions">

                    <button
                      className="btn btn-canjear"
                      onClick={() => handleCanjear(producto)}
                    >
                      Canjear
                    </button>

                    {usuario?.rol_id === 1 && (
                      <>
                        <button
                          className={`btn btn-sm ${producto.estado == 1
                            ? "btn-outline-danger"
                            : "btn-outline-success"
                            }`}
                          onClick={() => {
                            if (producto.estado == 1) {
                              handleEliminar(producto.id);
                            } else {
                              handleReactivar(producto.id);
                            }
                          }}
                        >
                          {producto.estado == 1
                            ? "Desactivar"
                            : "Activar"}
                        </button>

                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => {
                            setProductoEditar(producto);
                            setMostrarModal(true);
                          }}
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {
          totalPaginas > 1 && (

            <div className="paginacion">

              <button
                disabled={paginaActual === 1}
                onClick={() =>
                  setPaginaActual(paginaActual - 1)
                }
              >
                ←
              </button>

              {
                [...Array(totalPaginas)].map((_, index) => (

                  <button
                    key={index}
                    className={
                      paginaActual === index + 1
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setPaginaActual(index + 1)
                    }
                  >
                    {index + 1}
                  </button>

                ))
              }

              <button
                disabled={paginaActual === totalPaginas}
                onClick={() =>
                  setPaginaActual(paginaActual + 1)
                }
              >
                →
              </button>

            </div>

          )
        }
      </div>
      {
        mostrarModal && (
          <ProductoModal
            productoEditar={productoEditar}
            onClose={() => setMostrarModal(false)}
            onSuccess={cargarProductos}
          />
        )
      }
    </MainLayout>
  )
}

export default Productos