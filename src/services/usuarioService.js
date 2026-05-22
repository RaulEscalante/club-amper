const API_URL_LOCAL = "http://localhost/club-amper-api/backend/api";
export const loginUsuario = async (data) => {

  try {

    const response = await fetch(
      `${API_URL_LOCAL}/usuario/login.php`,
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
    `${API_URL_LOCAL}/usuario/registrar.php`,
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
    `${API_URL_LOCAL}/usuario/perfil.php`,
    {
      headers: {
        "Content-Type": "application/json",
        "usuario": JSON.stringify(usuario)
      }
    }
  );

  return await response.json();
};