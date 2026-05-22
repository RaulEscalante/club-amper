const API_URL_LOCAL = "http://localhost/club-amper-api/backend/api";

export const canjearProducto = async (data) => {
  try {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const response = await fetch(
      `${API_URL_LOCAL}/canje/crear.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "usuario": JSON.stringify(usuario)
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("Error en canje:", error);
    return null;
  }
};
export const obtenerHistorial = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario")
    );

    const response = await fetch(
      `${API_URL_LOCAL}/canje/historial.php`,
      {
        headers: {
          "Content-Type": "application/json",
          "usuario": JSON.stringify(usuario)
        }
      }
    );

    return await response.json();

  } catch (error) {

    console.error(
      "Error obteniendo historial:",
      error
    );

    return null;
  }  
};

export const obtenerCanjesAdmin = async () => {

  try {

    const usuario =
      JSON.parse(localStorage.getItem("usuario"));

    const response = await fetch(
      `${API_URL_LOCAL}/canje/listar.php`,
      {
        headers: {
          "usuario": JSON.stringify(usuario)
        }
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);
    return null;
  }
};
export const actualizarEstadoCanje = async (
    canje_id,
    estado
) => {

    try {

        const usuario =
            JSON.parse(localStorage.getItem("usuario"));

        const response = await fetch(
            `${API_URL_LOCAL}/canje/actualizarEstado.php`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "usuario": JSON.stringify(usuario)
                },

                body: JSON.stringify({
                    id: canje_id,
                    estado
                })
            }
        );

        return await response.json();

    } catch (error) {

        console.error(error);

        return null;
    }
};