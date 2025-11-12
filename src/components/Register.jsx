import React, { useState } from 'react'
import './css/register.css'
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    contrasena: '',
    correo: '',
    telefono: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contrasena !== confirmPassword) {
      alert('⚠️ Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://uninpahu-tgb4.onrender.com/usuario/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.text();

      if (response.ok) {
        alert('✅ Usuario creado correctamente');
        setFormData({
          nombreUsuario: '',
          nombre: '',
          apellido: '',
          contrasena: '',
          correo: '',
          telefono: ''
        });
        setConfirmPassword('');
      } else {
        alert(`❌ Error al crear usuario: ${result}`);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('🚨 Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-left-content">
          <h1>Bienvenido a UNINPAHU Market</h1>
          <p>Compra, vende y descubre productos únicos en tu comunidad.</p>
        </div>
      </div>

      <div className="register-right">
        <div className="register-card">
          <div className="register-logo">
            <div className="logo-box">UN</div>
            <div className="logo-text">
              <h2>UNINPAHU</h2>
              <p>Market</p>
            </div>
          </div>

          <h3 className="register-title">Crea tu cuenta</h3>
          <p className="register-subtitle">Regístrate en UNINPAHU Market gratis</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
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
              <FaUser className="icon" />
              <input
                type="text"
                name="nombre"
                placeholder="Nombres"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="apellido"
                placeholder="Apellidos"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="correo"
                placeholder="tu@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                placeholder="Contraseña"
                value={formData.contrasena}
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

            <div className="input-group">
              <FaLock className="icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-pass"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" required /> Acepto los términos y condiciones
              </label>
            </div>

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="separator">O regístrate con</div>

          <div className="social-register">
            <button className="btn-social google"><FcGoogle /> Google</button>
            <button className="btn-social facebook"><FaFacebook /> Facebook</button>
          </div>

          <p className="login-text">
            ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
