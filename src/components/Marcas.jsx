import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/marcas.css";

const API_BASE_URL = "https://uninpahu-tgb4.onrender.com";

export default function Marcas() {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNegocios = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/negocios`);
        if (!res.ok) throw new Error("Error al obtener los negocios");

        const data = await res.json();

        const negociosConImagen = await Promise.all(
          data.map(async (negocio) => {
            try {
              const imgRes = await fetch(`${API_BASE_URL}/negocios/${negocio.id}/imagen`);
              if (imgRes.ok) {
                const blob = await imgRes.blob();
                const imageUrl = URL.createObjectURL(blob);
                return { ...negocio, imagen: imageUrl };
              } else {
                return { ...negocio, imagen: null };
              }
            } catch {
              return { ...negocio, imagen: null };
            }
          })
        );

        setMarcas(negociosConImagen);
      } catch (error) {
        console.error("Error cargando negocios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNegocios();
  }, []);

  const handleClick = (nombre) => {
  navigate(`/marca/${encodeURIComponent(nombre)}`);
};


  if (loading) {
    return (
      <section className="marcas-container">
        <h2>Empresas Destacadas</h2>
        <p className="loading-text">Cargando negocios...</p>
      </section>
    );
  }

  if (marcas.length === 0) {
    return (
      <section className="marcas-container">
        <h2>Empresas Destacadas</h2>
        <p>No hay negocios registrados aún.</p>
      </section>
    );
  }

  return (
    <section className="marcas-container">
      <h2>
        <span className="icono"></span> Empresas Destacadas
      </h2>

      <div className="marcas-grid">
        {marcas.map((marca) => (
          <div
            className="marca-card"
            key={marca.id}
            onClick={() => handleClick(marca.nombre)}
          >
            <div className="marca-img-container">
              <img
                src={marca.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen"}
                alt={marca.nombre}
                className="marca-img"
              />
            </div>
            <h3 className="marca-nombre">{marca.nombre}</h3>
            <p className="marca-descripcion">
              {marca.descripcion || "Negocio destacado en la plataforma"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
