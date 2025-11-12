import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FiX, FiUploadCloud } from "react-icons/fi";
import "./css/productoForm.css";

const API_BASE_URL = "https://uninpahu-tgb4.onrender.com";

export default function ProductoForm({ onClose, onProductoCreated }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    descuento: "",
    categoriasIds: [],
  });
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Debes iniciar sesión para agregar productos");
        return;
      }

      const decoded = jwtDecode(token);
      const idNegocio = decoded?.idNegocio || decoded?.negocioId || decoded?.id || null;
      if (!idNegocio) {
        alert("No se encontró un negocio asociado al usuario");
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key !== "categoriasIds") data.append(key, val);
      });
      imagenes.forEach((img) => data.append("imagenes", img));
      formData.categoriasIds.forEach((id) => data.append("categoriasIds", id));
      data.append("idNegocio", idNegocio);

      const res = await axios.post(`${API_BASE_URL}/productos`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMensaje("✅ Producto creado correctamente");
      onProductoCreated?.(res.data);
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        descuento: "",
        categoriasIds: [],
      });
      setImagenes([]);
    } catch (err) {
      console.error("Error al crear producto:", err);
      setMensaje(`❌ ${err.response?.data?.message || "Error al crear el producto"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="producto-modal">
      <div className="producto-modal-content">
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
        <h2>Agregar Producto</h2>

        <form onSubmit={handleSubmit} className="producto-form">
          <label>Nombre del producto *</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

          <label>Descripción *</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />

          <label>Precio *</label>
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />

          <label>Stock *</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

          <label>Descuento (%)</label>
          <input
            type="number"
            name="descuento"
            value={formData.descuento}
            onChange={handleChange}
            min="0"
            max="100"
          />

          <label>Categorías (IDs separados por coma)</label>
          <input
            type="text"
            placeholder="Ej: 1, 2, 3"
            value={formData.categoriasIds.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                categoriasIds: e.target.value
                  .split(",")
                  .map((id) => parseInt(id.trim()))
                  .filter((id) => !isNaN(id)),
              }))
            }
          />

          <label>Imágenes</label>
          <div className="file-input">
            <FiUploadCloud />
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Agregar producto"}
          </button>

          {mensaje && <p className="mensaje">{mensaje}</p>}
        </form>
      </div>
    </div>
  );
}
