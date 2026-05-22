import Swal from "sweetalert2";

export const alertaExito = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: mensaje,
    confirmButtonColor: "#bb1818"
  });
};

export const alertaError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
    confirmButtonColor: "#bb1818"
  });
};

export const alertaConfirmacion = async (mensaje) => {

  return await Swal.fire({
    title: "¿Estás seguro?",
    text: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#bb1818",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar"
  });
};