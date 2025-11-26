import React from "react";
import "./css/banner.css";

const Banner = () => {
  return (
    <div className="banner-wrapper">
      <div className="banner-container">

        <div className="banner-left">
          <span className="banner-tag">¡ÚLTIMA OPORTUNIDAD!</span>

          <h2 className="banner-title">
            ESPECIAL UNINPAHU <br /> BLACK FRIDAY
          </h2>

          <div className="banner-price-box">
            <div className="banner-discount">
              <span className="big">70%</span>
              <span className="small">OFF</span>
            </div>

            <div className="banner-prices">
              <span className="old-price">$5.999.000</span>
              <span className="new-price">$1.799.000</span>
              <p className="banner-sub">Los mejores descuentos del año</p>
            </div>
          </div>

          <div className="banner-benefits">
            <span>🚚 Envío Gratis</span>
            <span>💳 12 Cuotas sin interés</span>
            <span>🛡️ Garantía Extendida</span>
          </div>

          <button className="banner-btn">COMPRAR AHORA</button>
        </div>

        <div className="banner-right">
          <div className="img-frame">
            <img
              src="https://i.imgur.com/ghhLFxZ.png"
              alt="Sale"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
