import React, { useState } from 'react'
import './css/login.css'
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import { useAuth } from "../context/AuthContext"; 

function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    password: ''
  });

  const navigate = useNavigate();
  const { handleLogin } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://uninpahu-tgb4.onrender.com/usuario/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        handleLogin(token); 

        const decoded = jwtDecode(token);
        console.log("Bienvenido:", decoded.sub);

        if (onLoginSuccess) onLoginSuccess();

        navigate('/'); 

      } else {
        const errorText = await response.text();
        alert(`⚠️ Error al iniciar sesión: ${errorText}`);
      }

    } catch (error) {
      console.error('Error de conexión:', error);
      alert('🚨 No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-box">UN</div>
          <div>
            <h2>UNINPAHU</h2>
            <p>Market</p>
          </div>
        </div>

        <h3 className="login-title">Bienvenido de nuevo</h3>
        <p className="login-subtitle">Ingresa a tu cuenta de UNINPAHU Market</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="text"
              name="nombreUsuario"
              placeholder="Nombre de usuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-pass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <a href="/" className="forgot">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="separator">O continúa con</div>

        <div className="social-login">
          <button className="btn-social google"><FcGoogle /> Google</button>
          <button className="btn-social facebook"><FaFacebook /> Facebook</button>
        </div>

        <p className="register-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="register-link">
            Regístrate gratis
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
