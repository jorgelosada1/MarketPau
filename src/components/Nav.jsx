import React, { useState } from 'react';
import './css/nav.css';
import {
  CiLocationOn,
  CiSearch,
  CiUser,
  CiHeart,
  CiShoppingCart,
  CiMenuBurger
} from "react-icons/ci";
import Login from './Login';
import Register from './Register';
import Cart from './Cart';
import SellerCenter from './SellerCenter';
import ProductoForm from './ProductoForm';
import { useAuth } from '../context/AuthContext.jsx';

function Nav() {
  const [activeModal, setActiveModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user: usuario, handleLogout } = useAuth();

  const handleLogoutAndRefresh = () => {
    handleLogout();
    alert('👋 Sesión cerrada correctamente');
    window.location.reload();
  };

  const handleLoginSuccess = () => {
    setActiveModal(null);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setShowUserMenu(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="NavContainer">
      <div className="NavUp">
        <div className="NavUp_Location">
          <CiLocationOn />
          Envía a Bogotá
        </div>
        <div className="NavUp_Letter">
          <div>Descargar la App</div>
          <div onClick={() => openModal("seller")} className="clickable">Vender</div>
        </div>
      </div>

      <div className="NavMain">
        <div className="NavMain_Logo">
          <div className="logo-icon">UN</div>
          <div className="logo-text">
            <div className="name">UNINPAHU</div>
            <div className="sub">Market</div>
          </div>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <CiMenuBurger />
        </div>

        <div className={`NavMain_Search ${menuOpen ? 'active' : ''}`}>
          <input type="text" placeholder="Buscar productos, marcas y más..." />
          <button><CiSearch /></button>
        </div>

        <div className={`NavMain_Actions ${menuOpen ? 'active' : ''}`}>
          {!usuario ? (
            <div onClick={() => openModal("login")} className="action-btn">
              <CiUser /><span>Mi cuenta</span>
            </div>
          ) : (
            <div className="user-menu-container">
              <div className="action-btn" onClick={() => setShowUserMenu(!showUserMenu)}>
                <CiUser /><span>{usuario}</span>
              </div>

              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={() => alert("⚙️ Ir a perfil (por implementar)")}>Perfil</button>
                  <button onClick={() => openModal("producto")}>Agregar producto</button>
                  <button onClick={handleLogoutAndRefresh}>Cerrar sesión</button>
                </div>
              )}
            </div>
          )}

          <div className="action-btn">
            <CiHeart /><span>Favoritos</span>
          </div>

          <div onClick={() => openModal("cart")} className="cart action-btn">
            <CiShoppingCart />
            <span>Carrito</span>
            <span className="badge">3</span>
          </div>
        </div>
      </div>

      <hr />

      <div className={`NavLinks ${menuOpen ? 'active' : ''}`}>
        <a href="#">Ofertas</a>
        <a href="#">Historias de Vida</a>
        <a href="#">Formación</a>
        <a onClick={() => openModal("seller")} className="clickable">Vender</a>
        <a href="#">Ayuda</a>
      </div>
      <hr />

      {activeModal === "login" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>✖</button>
            <Login 
              onSwitchToRegister={() => openModal("register")} 
              onLoginSuccess={handleLoginSuccess} 
            />
          </div>
        </div>
      )}

      {activeModal === "register" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>✖</button>
            <Register />
          </div>
        </div>
      )}

      {activeModal === "cart" && (
        <Cart onClose={closeModal} />
      )}

      {activeModal === "seller" && (
        <SellerCenter onClose={closeModal} />
      )}

      {activeModal === "producto" && (
        <ProductoForm
          onClose={closeModal}
          onProductoCreated={() => {
            alert("✅ Producto agregado correctamente");
            closeModal();
          }}
        />
      )}
    </div>
  );
}

export default Nav;
