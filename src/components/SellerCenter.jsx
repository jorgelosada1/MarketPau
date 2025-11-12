import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import "./css/sellerCenter.css";

const API_BASE_URL = "https://uninpahu-tgb4.onrender.com";

function SellerCenter({ onClose }) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    registradoCamara: false,
    direccion: "",
    paginaWeb: "",
    ciudad: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const idUsuario = decoded.id || decoded.sub || decoded.userId;
      if (!idUsuario) {
        alert("❌ No se pudo obtener el ID del usuario desde el token");
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append("idUsuario", idUsuario);

      const res = await fetch(`${API_BASE_URL}/negocios`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const responseText = await res.text();
      console.log("📩 Respuesta del servidor:", responseText);

      if (res.ok) {
        alert("✅ Negocio creado con éxito");
        setShowForm(false);
        setFormData({
          nombre: "",
          descripcion: "",
          fechaInicio: "",
          registradoCamara: false,
          direccion: "",
          paginaWeb: "",
          ciudad: "",
          imagen: null,
        });
      } else if (res.status === 400) {
        alert("Datos faltantes o formato inválido en el formulario");
      } else if (res.status === 401) {
        alert("Sesión expirada o no autorizada, inicia sesión de nuevo.");
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="seller-container">
      <button className="seller-close" onClick={onClose}>✖</button>

      <div className="seller-main">
        <div className="seller-banner">
          <h1>Empieza a vender hoy</h1>
          <p>Únete a miles de vendedores en el marketplace de UNINPAHU</p>
          <button
            className="create-btn"
            onClick={() => {
              if (!user) {
                alert("Debes iniciar sesión para continuar");
                return;
              }
              setShowForm(true);
            }}
          >
            Crear cuenta de vendedor
          </button>
        </div>

        <div className="seller-grid">
          <div className="seller-card">
            <h3>Sin comisiones los primeros 3 meses</h3>
            <p>Empieza a vender sin costos iniciales</p>
          </div>
          <div className="seller-card">
            <h3>Alcance de miles de compradores</h3>
            <p>Llega a toda la comunidad UNINPAHU</p>
          </div>
          <div className="seller-card">
            <h3>Gestión fácil de inventario</h3>
            <p>Herramientas para administrar tus productos</p>
          </div>
          <div className="seller-card">
            <h3>Pagos seguros y rápidos</h3>
            <p>Recibe tu dinero en menos de 48 horas</p>
          </div>
        </div>

        <div className="seller-steps">
          <h2>¿Cómo empezar?</h2>
          <p>Es muy fácil comenzar a vender</p>
          <div className="steps-list">
            {[
              ["Crea tu cuenta", "Regístrate gratis y completa tu perfil de vendedor"],
              ["Publica tus productos", "Sube fotos, describe tus productos y fija precios"],
              ["Recibe pedidos", "Los compradores encontrarán tus productos y realizarán pedidos"],
              ["Envía y cobra", "Envía los productos y recibe tu pago de forma segura"],
            ].map(([title, desc], i) => (
              <div className="step" key={i}>
                <span className="number">{i + 1}</span>
                <div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="sellerForm-overlay">
          <div className="sellerForm-modal">
            <button
              className="sellerForm-close"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
            <h2>Crear cuenta de vendedor</h2>

            <form onSubmit={handleSubmit} className="sellerForm">
              <label>
                Nombre *
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Descripción
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </label>

              <label>
                Fecha de inicio
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                />
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="registradoCamara"
                  checked={formData.registradoCamara}
                  onChange={handleChange}
                />
                Registrado en cámara de comercio
              </label>

              <label>
                Dirección
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </label>

              <label>
                Página web
                <input
                  type="text"
                  name="paginaWeb"
                  value={formData.paginaWeb}
                  onChange={handleChange}
                />
              </label>

              <label>
                Ciudad
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </label>

              <label>
                Imagen
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleChange}
                />
              </label>

              <button type="submit" className="sellerForm-submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerCenter;
