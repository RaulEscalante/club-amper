const API_URL_LOCAL = "https://club-amper-api-production.up.railway.app";
export const loginUsuario = async (data) => {

  try {

    const response = await fetch(
      `${API_URL_LOCAL}/api/usuario/login.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    const result = await response.json();

    return result;

  } catch (error) {

    console.error("Error login:", error);

    return null;

  }

};
export const registrarUsuario = async (data) => {

  const response = await fetch(
    `${API_URL_LOCAL}/api/usuario/registrar.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return await response.json();
};
export const obtenerPerfil = async () => {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const response = await fetch(
    `${API_URL_LOCAL}/api/usuario/perfil.php`,
    {
      headers: {
        "Content-Type": "application/json",
        "usuario": JSON.stringify(usuario)
      }
    }
  );

  return await response.json();
};
export const actualizarTelefono = async (telefono) => {

  const usuario =
    JSON.parse(localStorage.getItem("usuario"));

  const response = await fetch(
    `${API_URL_LOCAL}/api/usuario/actualizarTelefono.php`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "usuario": JSON.stringify(usuario)
      },

      body: JSON.stringify({
        telefono
      })
    }
  );

  return await response.json();
};