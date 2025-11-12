import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiStar,
  FiBox,
  FiHash,
  FiShoppingBag,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import "./css/pagina.css";

const API_BASE_URL = "https://uninpahu-tgb4.onrender.com";

export default function Pagina() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [negocio, setNegocio] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNegocio = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/negocios`);
        if (!res.ok) throw new Error("Error al obtener negocios");
        const data = await res.json();

        const encontrado = data.find(
          (n) => n.nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (!encontrado) {
          setNegocio(null);
          setLoading(false);
          return;
        }

        const detallesRes = await fetch(`${API_BASE_URL}/negocios/${encontrado.id}`);
        if (!detallesRes.ok) throw new Error("Error al obtener detalles del negocio");
        const detalles = await detallesRes.json();

        setNegocio(detalles);

        try {
          const imgRes = await fetch(`${API_BASE_URL}/negocios/${encontrado.id}/imagen`);
          if (imgRes.ok) {
            const blob = await imgRes.blob();
            setImagen(URL.createObjectURL(blob));
          }
        } catch (err) {
          console.error("Error al cargar imagen:", err);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocio();
  }, [nombre]);

  if (loading) {
    return (
      <div className="pagina-container">
        <p className="loading-text">Cargando información del negocio...</p>
      </div>
    );
  }

  if (!negocio) {
    return (
      <div className="pagina-container">
        <button className="boton-volver" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>No se encontró información para "{nombre}"</h2>
      </div>
    );
  }

  return (
    <div className="pagina-container">
      <button className="boton-volver" onClick={() => navigate(-1)}>
        <FiArrowLeft />
      </button>

      <div
        className="pagina-banner"
        style={{
          backgroundImage: `url(${
            imagen || "https://via.placeholder.com/1200x400?text=Sin+imagen"
          })`,
        }}
      >
        <div className="pagina-overlay">
          <h2>{negocio.nombre}</h2>
          <p>{negocio.descripcion || "Negocio destacado en nuestra plataforma."}</p>
        </div>
      </div>

      <div className="pagina-info">
        <div className="pagina-about">
          <h3>Acerca de {negocio.nombre}</h3>
          <p>
            {negocio.descripcion ||
              "Este negocio aún no tiene una descripción detallada."}
          </p>

          <div className="pagina-datos">
            <p>
              <FiStar /> Calificación: {negocio.calificacion ?? "Sin calificar"}
            </p>
            <p>
              <FiBox /> Productos: {negocio.cantidadProductos ?? "0"}
            </p>
            <p>
              <FiCalendar /> Fecha de inicio:{" "}
              {negocio.fechaInicio
                ? new Date(negocio.fechaInicio).toLocaleDateString("es-CO")
                : "No registrada"}
            </p>
            <p>
              <FiMapPin /> Dirección: {negocio.direccion || "No especificada"}
            </p>
            <p>
              <FiMapPin /> Ciudad: {negocio.ciudad || "No especificada"}
            </p>
            <p>
              <FiGlobe />{" "}
              {negocio.paginaWeb ? (
                <a
                  href={negocio.paginaWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {negocio.paginaWeb}
                </a>
              ) : (
                "Sin página web"
              )}
            </p>
            <p>
              {negocio.registradoCamara ? (
                <>
                  <FiCheckCircle className="icon-verified" /> Registrado en cámara
                  de comercio
                </>
              ) : (
                <>
                  <FiXCircle className="icon-unverified" /> No registrado en cámara
                  de comercio
                </>
              )}
            </p>
          </div>
        </div>

        <div className="pagina-productos">
          <h3>Productos de {negocio.nombre}</h3>
          {negocio.cantidadProductos > 0 ? (
            <div className="productos-grid">
              <p>
                <FiShoppingBag /> Aquí se mostrarán los productos del negocio.
              </p>
            </div>
          ) : (
            <p>Este negocio no tiene productos registrados aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
