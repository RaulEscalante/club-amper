const API_URL_LOCAL = "https://api.ampercompany.com.pe";
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
  try {
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

    const text = await response.text(); // 👈 primero texto

    try {
      return JSON.parse(text); // 👈 intenta JSON
    } catch (e) {
      console.error("Respuesta NO JSON del backend:", text);
      return {
        success: false,
        message: "Error del servidor"
      };
    }

  } catch (error) {
    console.error("Error registrar:", error);
    return {
      success: false,
      message: "Error de red"
    };
  }
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

export const forgotPassword = async (correo) => {

  const response = await fetch(
    `${API_URL_LOCAL}/api/auth/forgot-password.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correo
      })
    }
  );

  return await response.json();
};

export const resetPassword = async (
  token,
  password
) => {

  const response = await fetch(
    `${API_URL_LOCAL}/api/auth/reset-password.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        password
      })
    }
  );

  return await response.json();
};

export const reenviarVerificacion = async (
  correo
) => {

  try {

    const response = await fetch(
      `${API_URL_LOCAL}/api/auth/reenviar-verificacion.php`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          correo
        })
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return null;
  }
};
export const cambiarCorreoVerificacion = async (
  correo_actual,
  correo_nuevo
) => {

  try {

    const response = await fetch(
      `${API_URL_LOCAL}/api/auth/cambiar-correo-verificacion.php`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          correo_actual,
          correo_nuevo
        })
      }
    );

    return await response.json();

  } catch (error) {

    console.error(error);

    return null;
  }
};
export const cambiarPassword = async (
  data
) => {

  try {

    const usuario =
      JSON.parse(
        localStorage.getItem(
          "usuario"
        )
      );

    const response =
      await fetch(
        `${API_URL_LOCAL}/api/usuario/cambiar-password.php`,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

            "usuario":
              JSON.stringify(
                usuario
              )

          },

          body:
            JSON.stringify(
              data
            )

        }
      );

    return await response.json();

  } catch (error) {

    console.error(error);

    return null;

  }

};