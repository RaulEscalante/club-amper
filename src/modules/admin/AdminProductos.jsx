import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { obtenerProductos, eliminarProducto, reactivarProducto } from "../../services/productosService";
import { alertaExito, alertaError, alertaConfirmacion } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";
import "../../styles/adminProductos.css";
import ProductoModal from "../../components/ProductoModal";

function AdminProductos() {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] =
    useState(1);
  const itemsPorPagina = 8;

  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] =
    useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    const response = await obtenerProductos();

    if (response?.success) {
      setProductos(response.data);
    }
    setLoading(false);
  };

  const [productoEditar, setProductoEditar] =
    useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const productosFiltrados =
    productos.filter(producto => {

      const texto =
        busqueda.toLowerCase();

      return (
        producto.codigo_sku?.toLowerCase().includes(texto) ||
        producto.nombre?.toLowerCase().includes(texto) ||
        producto.marca?.toLowerCase().includes(texto)
      );
    });

  const indiceInicial =
    (paginaActual - 1) * itemsPorPagina;

  const indiceFinal =
    indiceInicial + itemsPorPagina;

  const productosPaginados =
    productosFiltrados.slice(
      indiceInicial,
      indiceFinal
    );

  const totalPaginas =
    Math.ceil(
      productosFiltrados.length / itemsPorPagina
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

      alertaExito("Producto activado");

      cargarProductos();

    } else {

      alertaError(
        response?.message || "Error al activar"
      );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading">
          Cargando productos...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="admin-productos-container">

        {/* HEADER */}
        <div className="admin-productos-header">

          <div>
            <h2>Gestión de Productos</h2>

            <p>
              Administra el catálogo de productos
            </p>
          </div>

        </div>
        <div className="top-actions">

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="input-busqueda"
          />

          <button
            className="btn-agregar-producto"
            onClick={() => {
              setProductoEditar(null);
              setMostrarModal(true);
            }}
          >
            Agregar Producto
          </button>

        </div>
        {/* TABLA */}
        <div className="table-container">

          <table className="productos-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Puntos</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {productosPaginados.map((p) => (

                <tr key={p.id}>

                  <td>{p.id}</td>

                  <td className="producto-nombre-cell">
                    {p.nombre}
                  </td>

                  <td>{p.marca}</td>

                  <td>
                    {p.puntos_requeridos}
                  </td>

                  <td>
                    {p.stock}
                  </td>

                  <td>
                    <span
                      className={`estado-producto ${p.estado == 1
                        ? "activo"
                        : "inactivo"
                        }`}
                    >
                      {p.estado == 1
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>

                  <td>

                    <div className="acciones-producto">

                      <button
                        className="btn-editar-producto"
                        onClick={() => {
                          setProductoEditar(p);
                          setMostrarModal(true);
                        }}
                      >
                        Editar
                      </button>

                      {p.estado == 1 ? (

                        <button
                          className="btn-desactivar-producto"
                          onClick={() =>
                            handleEliminar(p.id)
                          }
                        >
                          Desactivar
                        </button>

                      ) : (

                        <button
                          className="btn-activar-producto"
                          onClick={() =>
                            handleReactivar(p.id)
                          }
                        >
                          Activar
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

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

  );


}

export default AdminProductos;