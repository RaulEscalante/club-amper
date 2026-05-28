const API_URL = "http://192.168.1.88/club-amper-api/backend/api";
const API_URL_LOCAL = "https://api.ampercompany.com.pe";

export const obtenerProductos = async () => {

    try {

        const usuario = JSON.parse(
            localStorage.getItem("usuario")
        );

        const response = await fetch(
            `${API_URL_LOCAL}/api/producto/listar.php`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "usuario": JSON.stringify(usuario)
                }
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(
            "Error obteniendo productos:",
            error
        );

        return [];

    }

};

export const crearProducto = async (producto) => {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        const response = await fetch(`${API_URL_LOCAL}/api/producto/crear.php`, {
            method: "POST",
            headers: {
                "usuario": JSON.stringify(usuario)
            },
            body: producto
        }
        );
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error al crear producto:", error);
        return null;
    }
};

export const editarProducto = async (producto) => {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        const response = await fetch(
            `${API_URL_LOCAL}/api/producto/editar.php`,
            {
                method: "POST",
                headers: {
                    "usuario": JSON.stringify(usuario)
                },
                body: producto
            }
        );
        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error al editar producto:", error);
        return null;
    }
};

export const eliminarProducto = async (id) => {
    try {

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        const response = await fetch(
            `${API_URL_LOCAL}/api/producto/desactivar.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "usuario": JSON.stringify(usuario)
                },
                body: JSON.stringify({ id })
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al desactivar producto:", error);
        return null;
    }
};
export const reactivarProducto = async (id) => {
    try {

        const usuario = JSON.parse(
            localStorage.getItem("usuario")
        );

        const response = await fetch(
            `${API_URL_LOCAL}/api/producto/reactivar.php`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "usuario": JSON.stringify(usuario)
                },
                body: JSON.stringify({ id })
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(
            "Error al reactivar producto:",
            error
        );

        return null;

    }
};