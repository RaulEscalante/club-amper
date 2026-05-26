import { useEffect, useState } from "react";
import { crearProducto, editarProducto } from "../services/productosService";
import { alertaExito, alertaError, alertaConfirmacion } from "../utils/alerts";
import "../styles/agregar.css";

function ProductoModal({ productoEditar, onClose, onSuccess }) {

  const [imagenFile, setImagenFile] = useState(null);

  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const [formData, setFormData] = useState({
    id: null,
    codigo_sku: "",
    nombre: "",
    marca: "",
    puntos_requeridos: "",
    imagen: "",
    stock: 1
  });

  useEffect(() => {
    if (productoEditar) {
      setFormData(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const confirmar = await alertaConfirmacion(
      formData.id
        ? "¿Deseas guardar los cambios?"
        : "¿Deseas crear este producto?"
    );

    if (!confirmar.isConfirmed) return;
    /*-------------------------------------------------------------------------
    | FORMDATA
    |-------------------------------------------------------------------------*/
    const formDataToSend = new FormData();

    if (formData.id) {
      formDataToSend.append("id", formData.id);
    }
    formDataToSend.append("codigo_sku", formData.codigo_sku);
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("marca", formData.marca);
    formDataToSend.append("puntos_requeridos", formData.puntos_requeridos);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("imagen_actual",formData.imagen);
    /*
    |--------------------------------------------------------------------------
    | IMAGEN
    |--------------------------------------------------------------------------
    */
    if (imagenFile) {
      formDataToSend.append("imagen", imagenFile);
    }
    /*
    |--------------------------------------------------------------------------
    | REQUEST
    |--------------------------------------------------------------------------
    */
    let response;
    if (formData.id) {
      response =
        await editarProducto(formDataToSend);
    } else {
      response =
        await crearProducto(formDataToSend);
    }
    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */
    if (response?.success) {
      alertaExito("Producto guardado");
      onSuccess();
      onClose();
    } else {
      alertaError("Error al guardar");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <h2>
          {formData.id ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="producto-form">

          <div className="form-grid">

            <div className="form-group">
              <label>SKU</label>
              <input name="codigo_sku" value={formData.codigo_sku}
                onChange={handleChange} placeholder="Código SKU"
              />
            </div>

            <div className="form-group">
              <label>Marca</label>
              <input name="marca" value={formData.marca}
                onChange={handleChange} placeholder="Marca"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Nombre del producto</label>

            <input name="nombre" value={formData.nombre}
              onChange={handleChange} placeholder="Nombre"
            />
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>Puntos</label>

              <input
                name="puntos_requeridos"
                value={formData.puntos_requeridos}
                onChange={handleChange}
                type="number"
              />
            </div>

            <div className="form-group">
              <label>Stock</label>

              <input
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                type="number"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Imagen del producto</label>
            <label className="upload-box">
              <input type="file" name="imagen"
                onChange={handleFileChange} hidden
              />
              {imagenFile ? (
                /* NUEVA IMAGEN SELECCIONADA */
                <img src={URL.createObjectURL(imagenFile)}
                  alt="preview" className="preview-img"
                />
              ) : formData.imagen ? (
                /* IMAGEN ACTUAL DEL PRODUCTO */
                <img src={`https://club-amper-api-production.up.railway.app/uploads/productos/${formData.imagen}`}
                  alt="producto" className="preview-img" />

              ) : (

                /* SIN IMAGEN */
                <div className="upload-placeholder">

                  <span className="upload-plus">
                    +
                  </span>

                  <p>Subir imagen</p>

                </div>

              )}

            </label>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-guardar"
            >
              Guardar Producto
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ProductoModal;