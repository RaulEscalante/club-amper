import MainLayout from "../../layouts/MainLayout";
import { useEffect, useState } from "react";
import "../../styles/adminCanjes.css";
import { obtenerCanjesAdmin, actualizarEstadoCanje } from "../../services/canjeService";
import { alertaExito, alertaError, alertaConfirmacion } from "../../utils/alerts";

function AdminCanjes() {

    const [canjes, setCanjes] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [nuevoEstado, setNuevoEstado] = useState("");
    const [loading, setLoading] = useState(true);

    const [busqueda, setBusqueda] = useState("");
    const [paginaActual, setPaginaActual] =
        useState(1);
    const itemsPorPagina = 8;

    useEffect(() => {
        cargarCanjes();
    }, []);

    const cargarCanjes = async () => {

        setLoading(true);

        const response =
            await obtenerCanjesAdmin();

        if (response?.success) {
            setCanjes(response.data);
        }

        setLoading(false);
    };

    const canjesFiltrados = canjes.filter(canje => {

        const texto = busqueda.toLowerCase();

        return (
            canje.nombres?.toLowerCase().includes(texto) ||
            canje.apellidos?.toLowerCase().includes(texto) ||
            canje.documento?.toLowerCase().includes(texto) ||
            canje.nombre_producto?.toLowerCase().includes(texto) ||
            String(canje.id).includes(texto)
        );
    });

    const indiceInicial =
        (paginaActual - 1) * itemsPorPagina;

    const indiceFinal =
        indiceInicial + itemsPorPagina;

    const canjesPaginados =
        canjesFiltrados.slice(
            indiceInicial,
            indiceFinal
        );

    const totalPaginas =
        Math.ceil(
            canjesFiltrados.length / itemsPorPagina
        );

    const guardarEstado = async (id) => {

        const confirmar = await alertaConfirmacion(
            "¿Deseas guardar los cambios?"
        );

        if (!confirmar.isConfirmed) return;

        const response = await actualizarEstadoCanje(
            id,
            nuevoEstado
        );

        if (response?.success) {

            alertaExito(
                "Estado actualizado correctamente"
            );

            setEditandoId(null);
            setNuevoEstado("");

            cargarCanjes();

        } else {

            alertaError(
                response?.message || "Error al actualizar"
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
            <div className="admin-canjes-container">
                {/* HEADER */}
                <div className="admin-header-canjes">
                    <div>
                        <h2>Gestión de Canjes</h2>
                        <p>
                            Administra los pedidos realizados
                        </p>
                    </div>
                    <div className="pending-box">
                        <span className="pending-count">
                            {canjes.filter(c => c.estado?.toLowerCase() === "pendiente").length}
                        </span>
                        <span> Pedidos pendientes</span>
                    </div>
                </div>

                <div className="busqueda-container">
                    <input
                        type="text"
                        placeholder="Buscar por cliente, documento, ticket..."
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setPaginaActual(1);
                        }}
                        className="input-busqueda"
                    />

                </div>
                {/* TABLA */}
                <div className="table-container">
                    <table className="canjes-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Cliente</th>
                                <th>Telefono</th>
                                <th>Producto</th>
                                <th>Puntos</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {canjesPaginados.map((c) => (
                                <tr key={c.id}>
                                    <td>Ticket N°{c.id}</td>
                                    <td>{c.nombres} {c.apellidos}</td>
                                    <td>{c.telefono || "No registrado"}</td>
                                    <td>{c.nombre_producto}</td>
                                    <td>{c.total_puntos}</td>
                                    <td>
                                        {editandoId === c.id ? (
                                            <select
                                                value={nuevoEstado}
                                                onChange={(e) =>
                                                    setNuevoEstado(e.target.value)
                                                }
                                            >
                                                <option value="pendiente">
                                                    Pendiente
                                                </option>

                                                <option value="entregado">
                                                    Entregado
                                                </option>

                                                <option value="cancelado">
                                                    Cancelado
                                                </option>
                                            </select>
                                        ) : (
                                            <span className={`estado ${c.estado?.toLowerCase()}`}>
                                                {c.estado}
                                            </span>
                                        )}
                                    </td>
                                    <td>{c.fecha}</td>
                                    <td>
                                        {editandoId === c.id ? (
                                            <>
                                                <button className="btn-guardar"
                                                    onClick={() => guardarEstado(c.id)}>
                                                    Guardar
                                                </button>

                                                <button className="btn-cancelar"
                                                    onClick={() => {
                                                        setEditandoId(null);
                                                        setNuevoEstado("")
                                                    }}>
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <button className="btn-entregado"
                                                onClick={() => {
                                                    setEditandoId(c.id);
                                                    setNuevoEstado(c.estado);
                                                }}>
                                                Editar
                                            </button>
                                        )}
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

        </MainLayout>
    );
}

export default AdminCanjes;