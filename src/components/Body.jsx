import React from "react";
import "./css/body.css";

function Body() {
  return (
    <div className="hero">
      <div className="hero-text">
        <span className="tag">¡Ofertas especiales!</span>
        <h1>
          Encuentra todo lo que necesitas en <span>UNINPAHU Market</span>
        </h1>
        <p>
          Miles de productos con la mejor calidad, precios increíbles y envío
          gratis. La plataforma de compras preferida por estudiantes y
          profesionales.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">Ver ofertas del día</button>
          <button className="btn-secondary">Explorar categorías</button>
        </div>
      </div>

      <div className="hero-offer">
        <span className="badge-new">¡Nuevo!</span>
        <div className="offer-card">
          <span className="badge-green">Envío gratis</span>
          <h3>¡Aprovecha nuestras ofertas!</h3>
          <p>Hasta 50% de descuento en productos seleccionados</p>
          <div className="price">
            <span className="current">$299.990</span>
            <span className="old">$599.990</span>
          </div>
          <button className="btn-offer">Ver producto</button>
        </div>
      </div>
    </div>
  );
}

export default Body;
