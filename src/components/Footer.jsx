import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import "./css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <h2 className="logo">
            <span className="logo-icon">UN</span> UNINPAHU
            <div className="market">Market</div>
          </h2>
          <p>
            La plataforma de marketplace líder para la comunidad universitaria.
            Encuentra todo lo que necesitas con la mejor calidad y precios.
          </p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-col">
          <h3>Enlaces rápidos</h3>
          <ul>
            <li>Acerca de nosotros</li>
            <li>Cómo funciona</li>
            <li>Vender en UNINPAHU</li>
            <li>Programa de afiliados</li>
            <li>Ofertas especiales</li>
            <li>Centro de ayuda</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Atención al cliente</h3>
          <p><FiPhone /> +57 1 234 5678</p>
          <p><FiMail /> soporte@uninpahu.edu.co</p>
          <p><FiMapPin /> Bogotá, Colombia</p>

          <h4>Horarios de atención</h4>
          <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
          <p>Sábados: 9:00 AM - 2:00 PM</p>
        </div>

        <div className="footer-col">
          <h3>Mantente informado</h3>
          <p>Suscríbete para recibir ofertas exclusivas y novedades.</p>
          <div className="subscribe">
            <input type="email" placeholder="Tu email" />
            <button>Suscribirse</button>
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <div className="feature">
          <i className="icon">🚚</i>
          <div>
            <h4>Envío gratis</h4>
            <p>En compras mayores a $100.000</p>
          </div>
        </div>
        <div className="feature">
          <i className="icon">🛡️</i>
          <div>
            <h4>Compra segura</h4>
            <p>Protección al comprador</p>
          </div>
        </div>
        <div className="feature">
          <i className="icon">💳</i>
          <div>
            <h4>Múltiples pagos</h4>
            <p>Tarjetas, PSE, efectivo</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 UNINPAHU Market. Todos los derechos reservados.</p>
        <div className="links">
          <span>Términos y condiciones</span>
          <span>Política de privacidad</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
